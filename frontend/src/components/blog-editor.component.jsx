import {Link} from "react-router-dom";
import logo from "../imgs/logo.png";

const BlogEditor = () => {
    return (
        <>
        <nav className = "navbar">
            <link to = "/" className = "flex-none w-10">
            <img src = {logo}/>
            </link>
            <p classname = "max-md:hidden text-black line-clamp-1 w-full">
                New blog </p>
            <div classname ="flex gap-4 ml-auto">
                <button classname = "btn-dark py-2">Publish</button>
                <button classname = "btn-light py-2">Save draft</button>
            </div>


            </nav>   
            </>
    )
}
export default BlogEditor;