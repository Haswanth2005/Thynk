import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const BlogInteraction = ({ title, blog, setBlog }) => {

    let { activity, activity: { total_likes, total_comments }, blog_id, author: { personal_info: { username: author_username } } } = blog;
    let { userAuth: { username } } = useContext(UserContext);

    return (
        <>
            <hr className="border-grey my-2" />
            <div className="flex gap-6 justify-between">
                <div className="flex gap-3 items-center" >
                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
                        <i className="fi fi-rr-heart"></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_likes}</p>

                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
                        <i className="fi fi-rr-comment-dots"></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_comments}</p>
                </div>

                <div className="flex gap-6 items-center">
                    {
                        username == author_username ?
                            <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">Edit</Link> : ""
                    }
                    <Link to={`https://www.google.com/search?q=${title}`} target="_blank"><i className="fi fi-brands-google text-xl hover:text-blue-500"></i></Link>
                </div>
            </div>
            <hr className="border-grey my-2" />
        </>
    )
}

export default BlogInteraction;
