import {Link} from "react-router-dom";
import logo from "../imgs/black.svg";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import {uploadImage} from "../common/aws";
import {useRef} from "react";
import {Toaster ,toast} from "react-hot-toast";

const BlogEditor = () => {
    let blogBannerRef = useRef();
    const handleBannerUpload = (e) => {
        // console.log(e);
        let img = e.target.files[0];
        // console.log(img);
        if(img){
            let loadingToast = toast.loading("Uploading...")
            uploadImage(img).then((url)=>
            {
                if(url){
                    toast.dismiss(loadingToast);
                    toast.success("Uploaded Successfully💐");
                    blogBannerRef.current.src = url;
                }
            })
            .catch(err=>{
                toast.dismiss(loadingToast);
                return toast.error(err);
            })
        }
    }

    const handleTitleKeyDown = (e) => {
        if(e.keyCode==13){
            e.preventDefault();
        }
        }
    const handleTitleChange = (e) => {
        let input = e.target;
    }



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
            <Toaster/>
            <AnimationWrapper>
                <section>
                    <div className = "mx-auto max-w-[900px] w-full">
                        <div className = "relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                            <label htmlFor = "uploadBanner">
                                <img ref = {blogBannerRef} src = {defaultBanner} classname = "z-20"/>
                                <input id = "uploadBanner"  type = "file" accept = ".png, .jpg, .jpeg" hidden
                                onChange = {handleBannerUpload}/>
                                </label>

                            </div>
                    </div>
                    <textarea
                        placeholder ="Blog Title" className = "text-4xl font-medium w-full h-20 outline-none resize-none bg-blue mt-10 leading-tight placeholder :opacity-40" onKeyDown={handleTitleKeyDown}
                        on Change ={handleTitleChange}>
                    </textarea>
                    </section>
            </AnimationWrapper>
        </>
    )
}
export default BlogEditor;