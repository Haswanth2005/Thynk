import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import bcrypt from 'bcrypt'
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken"
import cors from "cors";
import admin from "firebase-admin";
import fs from "fs";
import { getAuth } from "firebase-admin/auth";
import aws from "aws-sdk"

//Schema
import User from "./Schema/User.js";
import Blog from "./Schema/Blog.js";

const serviceAccountKey = JSON.parse(fs.readFileSync("./thynk-875-firebase-adminsdk-fbsvc-5cbda0404e.json", "utf8"))

const server = express();
let PORT = 3000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json())
server.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next();
});
server.use(cors())

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
})


//aws connection
const s3 = new aws.S3({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const generateUploadURL = async () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`

  return await s3.getSignedUrlPromise('putObject', {
    Bucket: 'thynk-photos',
    Key: imageName,
    Expires: 1000,
    ContentType: "image/jpeg"
  }
  )
}

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) {
    return res.status(403).json({ "error": "Access token not provided" })
  }

  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ "error": "Invalid access token" })
    }

    req.user = user.id
    next()
  })
}

const formatDatatoSend = (user) => {

  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname
  }
}

const generateUsername = async (email) => {
  let username = email.split("@")[0]

  let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)

  isUsernameNotUnique ? username += nanoid().substring(0, 3) : ""

  return username;
}

//upload image url route
server.get('/get-upload-url', (req, res) => {
  generateUploadURL().then(url => res.status(200).json({ uploadURL: url }))
    .catch(err => {
      console.log("S3 Error:", err)
      return res.status(500).json({ error: err.message })
    })
})

server.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body

  //validating data from frontend
  if (fullname.length < 3) {
    return res.status(403).json({ "error": "Fullname must b3e at least 3 letters long" })
  }

  if (!email.length) {
    return res.status(403).json({ "email": "Enter Email" })
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ "email": "Email is invalid" })
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({ "error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" })
  }

  //hashing
  bcrypt.hash(password, 10, async (err, hashed_password) => {

    let username = await generateUsername(email)

    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username }
    })

    user.save().then((u) => {
      return res.status(200).json(formatDatatoSend(u))
    }).catch(err => {
      if (err.code == 11000) {
        return res.status(500).json({ "error": "Email already exists" })
      }

      return res.status(500).json({ "error": err.message })
    })

  })

})

server.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({
    "personal_info.email": email
  }).then((user) => {
    if (!user) {
      return res.status(403).json({ "error": "Email not found" })
    }


    if (!user.google_auth) {
      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res.status(403).json({ "error": "Error occured while login please try again" })
        }

        if (!result) {
          return res.status(403).json({ "error": "Incorrect password" })
        } else {
          return res.status(200).json(formatDatatoSend(user))
        }
      })
    } else {
      return res.status(403).json({ "error": "Account was created using google. Try logging with google" })
    }


  })
    .catch(err => {
      console.log(err)
      return res.status(500).json({ "error": err.message })
    })

})

server.post("/google-auth", async (req, res) => {
  let { access_token } = req.body

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser

      picture = picture.replace("s96-c", "s384-c")

      let user = await User.findOne({ "personal_info.email": email }).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
        return u || null
      }).catch(err => {
        return res.status(500).json({ "error": err.message })
      })


      if (user) { //login
        if (!user.google_auth) {
          return res.status(403).json({ "error": "This email was signed up without google. Please log in with password to access the account" })
        }
        // Update profile_img if it changed
        if (user.personal_info.profile_img !== picture) {
          user.personal_info.profile_img = picture
          await user.save()
        }
      } else {
        let username = await generateUsername(email)
        user = new User({
          personal_info: { fullname: name, email, profile_img: picture, username },
          google_auth: true
        })

        await user.save().then((u) => {
          user = u
        })
          .catch(err => {
            return res.status(500).json({ "error": err.message })
          })
      }

      return res.status(200).json(formatDatatoSend(user))

    })
    .catch(err => {
      return res.status(500).json({ "error": "Failed to authenticate you with google. Try with some other google account" })
    })

})

server.post('/create-blog', verifyJWT, (req, res) => {

  let authorId = req.user
  let { title, des, banner, tags, content, draft } = req.body

  if (!draft) {
    if (!des || !des.length || des.length > 200) {
      return res.status(403).json({ "error": "Description must be not be greater than 200 characters long" })
    }
    if (!banner || !banner.length) {
      return res.status(403).json({ "error": "Banner image is required" })
    }
    if (!content.blocks.length) {
      return res.status(403).json({ "error": "Content cannot be empty" })
    }
    if (!tags || !tags.length || tags.length > 10) {
      return res.status(403).json({ "error": "Tags must be between 1 and 10" })
    }
  }

  if (!title || !title.length) {
    return res.status(403).json({ "error": "Title is required to create a blog" })
  }

  tags = tags || [];
  tags = tags.map(tag => tag.toLowerCase().trim())

  let blogId = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, '-').trim() + nanoid().substring(0, 4)

  let blog = new Blog({
    blog_id: blogId,
    title: title,
    des: des,
    banner: banner,
    tags: tags,
    content: content,
    author: authorId,
    draft: Boolean(draft)
  })

  blog.save().then(blog => {
    let incrementVal = draft ? 0 : 1
    User.findOneAndUpdate({ _id: authorId }, { $inc: { "account_info.total_posts": incrementVal }, $push: { blogs: blog._id } })
      .then((user) => {
        return res.status(200).json({ "message": "Blog created successfully", blogId: blogId })
      }).catch(() => {
        return res.status(500).json({ "error": "Error occured while updating user data. Try again later." })
      })
  })
    .catch(err => {
      console.log("Blog creation error:", err)
      return res.status(500).json({ "error": "Error occured while creating blog. Try again later." })
    })


})

server.listen(PORT, () => {
  console.log('listening on port -> ' + PORT)
})
