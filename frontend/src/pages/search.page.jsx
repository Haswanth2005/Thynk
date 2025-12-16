import React,{useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import InPageNavigation from '../components/inpage-navigation.component';
import Loader  from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import BlogPostCard from '../components/blog-post.component';
import UserCard from '../components/usercard.component';
import {filterPaginationData} from "../common/filter-pagination-data"

const SearchPage = () => {

  let { query } = useParams()

  let [blogs, setBlog] = useState(null)
  let [users, setUsers] = useState(null)

  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {query, page})
    .then(async ({ data }) => {
            console.log(data.blogs);


            let formatedData = await filterPaginationData({
              state: blogs,
              data: data.blogs,
              page,
              countRoute: "/search-blogs-count",
              data_to_send: { query},
              create_new_arr
            })

            console.log(formatedData);

            setBlog(formatedData)
          })
          .catch(err => {
          console.log(err)
        })
  }

  const fetchUsers = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", {query})
    .then(({ data : {users} }) => {
      setUsers(users)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    resetState()
    searchBlogs({page :1, create_new_arr:true})
    fetchUsers()
  }, [query])

  const resetState = () => {
    setBlog(null)
    setUsers(null)
  }

  const  UserCardWrapper = () => {
    return (
      <div>
        {
          users == null ? <Loader /> :
            (
              users.length ?
                users.map((user, i) => {
                  return <AnimationWrapper key={i}
                    transition={{duration:1, delay: i*0.08}}
                  >
                    <UserCard user={user} />
                  </AnimationWrapper>
                })
                : <NoDataMessage message="No Users Found" />
            )
        }
      </div>
    )
  }

  return (
    <section className='h-cover flex justify-center gap-10 '>
      <div className='w-full'>
        <InPageNavigation
          routes={[`Search Results from "${query}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
        >
          <>
            {
                blogs == null ? <Loader /> :
                  (
                    blogs.results.length ?
                      blogs.results.map((blog, i) => {
                        // return <AnimationWrapper keyValue={i}
                        return <AnimationWrapper key={i}
                          transition={{duration:1, delay: i*.1}}
                        >
                          <BlogPostCard content={blog} author={blog.author?.personal_info} />
                          {/* <BlogPostCard content={blog} author={blog.author.personal_info} /> */}
                        </AnimationWrapper>
                      })
                      :<NoDataMessage message="No Blogs Published" />

                  )
               }
              <LoadMoreDataBtn state={blogs} fetchDataFun={searchBlogs} />
          </>

          <UserCardWrapper />
        </InPageNavigation>
      </div>

      <div className='min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>
          <h1 className='font-medium text-xl mb-8 '><i className="ri-user-3-line mt-1 mr-1 text-xl"></i>User related to search</h1>
          <UserCardWrapper />
      </div>
    </section>
  )
}

export default SearchPage
