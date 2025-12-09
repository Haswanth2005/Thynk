import {Link} from "react-router-dom";
import logo from "../imgs/black.svg";

const BlogEditor = () => {
    return (
        <>
        <nav className = "navbar">
            <Link to="/" className='flex-none w-28'>
                <img src={logo} className='w-full' />
            </Link>

            <p className = "max-md:hidden text-black line-clamp-1 w-full">
                New blog </p>
            <div className ="flex gap-4 ml-auto">
                <button className = "btn-dark py-2">Publish</button>
                <button className = "btn-light py-2">Save draft</button>
            </div>


            </nav>
        </>
    )
}
export default BlogEditor;