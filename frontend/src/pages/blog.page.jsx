import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from '../components/loader.component'
import AnimationWrapper from '../common/page-animation'
import { getDay } from '../common/date'
import BlogInteraction from '../components/blog-interaction.component'
import BlogContent from '../components/blog-content.component'

export const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: '',
  author: { personal_info: {} },
  publishedAt: ""
}

const BlogPage = () => {

  let { blog_id } = useParams()

  const [blog, setBlog] = useState(blogStructure)
  const [loading, setLoading] = useState(true); // Added loading state

  let { title, banner, content, tags, des, author: { personal_info: { fullname, username: author_username, profile_img } }, publishedAt } = blog

  const fetchBlog = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", {
      blog_id
    })
      .then(({ data: { blog } }) => {
        setBlog(blog)
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchBlog()
  }, [blog_id])
 
  return (
    <AnimationWrapper>
      {
        loading ? <Loader /> :
          <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
            <img src={banner} className="aspect-video" />
            <div className="mt-12">
              <h2>{title}</h2>
              <div className="flex max-sm:flex-col justify-between my-8">
                <div className="flex gap-5 items-start">
                  <img src={profile_img} className="w-12 h-12 rounded-full" />
                  <p className="capitalize">
                    {fullname}
                    <br />
                    @
                    <Link to={`/user/${author_username}`} className="underline">{author_username}</Link>
                  </p>
                </div>
                <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
              </div>
            </div>

            <BlogInteraction title={title} blog={blog} setBlog={setBlog} />

            <div className="my-12 font-gelasio blog-page-content">
              {
                content[0] && content[0].blocks && content[0].blocks.map((block, i) => {
                  return <div key={i} className="my-4 md:my-8">
                    <BlogContent block={block} />
                  </div>
                })
              }
            </div>

            <BlogInteraction title={title} blog={blog} setBlog={setBlog} />

          </div>
      }
    </AnimationWrapper>
  )
}

export default BlogPage
