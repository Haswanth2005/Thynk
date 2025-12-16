import {Link} from "react-router-dom";
import logo from "../imgs/black.svg";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import {uploadImage} from "../common/aws";
import {useEffect, useRef} from "react";
import {Toaster ,toast} from "react-hot-toast";
import Editor, { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "../components/tools.component.jsx";

const BlogEditor = () => {
    let blogBannerRef = useRef();

    let { blog,blog:{title,banner,content,tags,des},setBlog,textEditor, setTextEditor,setEditorState} =
    useContext(EditorContext);

    //useEffect
    useEffect(()=>{
        setTextEditor(new EditorJS({
            holderId : "textEditor",
            data: content,
            tools: tools,
            placeholder : "Start writing your blog...",
        }));
    },[])
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
                    toast.success("Uploaded Successfully"); 

                    setBlog({...blog, banner: url});
                }
            })
            .catch(err=>{
                toast.dismiss(loadingToast);
                return toast.error(err.message || "Upload failed");
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

        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";

        setBlog({...blog, title: input.value});
    }
    const handleError=(e)=>{
        let img = e.target;
         
        img.src= defaultBanner;
    }
    const handlePublishEvent = () => {
        // if(!banner.length){
        //     return toast.error("Please upload a banner image");
        // }
        // if(!title.length){
        //     return toast.error("Please enter a title");
        // }
        // if(textEditor.isReady){
            textEditor.save().then((data)=>{
                // if(data.blocks.length){
                    setBlog({...blog, content: data});
                    setEditorState("publish");
                // }
                // else{
                //     return toast.error("Blog content cannot be empty");
                // }
            })
            .catch(err=>{
                return toast.error("Failed to save blog content");
            })
        //}
    }
    return (
        <>
        <nav className = "navbar">
            <Link to="/" className='flex-none w-28'>
                <img src={logo} className='w-full' />
            </Link>

            <p className = "max-md:hidden text-black line-clamp-1 w-full">
                {title.length? title : "New blog"}
                </p>
            <div className ="flex gap-4 ml-auto">
                <button className = "btn-dark py-2"
                onClick={handlePublishEvent}>Publish</button>
                <button className = "btn-light py-2">Save draft</button>
            </div>


            </nav>
            <Toaster/>
            <AnimationWrapper>
                <section>
                    <div className = "mx-auto max-w-[900px] w-full">
                        <div className = "relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                            <label htmlFor = "uploadBanner">
                                <img src = {banner} className = "z-20"/>
                                <input id = "uploadBanner"  type = "file" accept = ".png, .jpg, .jpeg" hidden
                                onChange = {handleBannerUpload}/>
                                </label>

                            </div>
                    </div>
                    <textarea
                        defaultValue={title}
                        placeholder ="Blog Title" className = "text-4xl font-medium w-full h-20 outline-none resize-none bg-blue mt-10 leading-tight placeholder :opacity-40" onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}>
                    </textarea>

                    <hr className = "w-full opacity-10 my-5"/>

                    <div id="textEditor" className="font-gelasio"></div>
                </section>
            </AnimationWrapper>
        </>
    )
}
export default BlogEditor;