import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BlogEditor from "../components/blog-editor.component.jsx"
import PublishForm from "../components/publish-form.component.jsx"
import Loader from "../components/loader.component"
import { createContext } from "react";

const blogStructure = {
    title: "",
    banner: "",
    content: [],
    tags: [],
    des: '',
    author: { personal_info: {} },
    activity: { total_likes: 0, total_comments: 0 },
    blog_id: ""
}
export const EditorContext = createContext({});

const Editor = () => {

    const [blog, setBlog] = useState(blogStructure);
    const [editorState, setEditorState] = useState("editor");
    const [textEditor, setTextEditor] = useState({ isReady: false });
    const [loading, setLoading] = useState(true);

    let { userAuth: { access_token } } = useContext(UserContext);
    let { blog_id } = useParams();

    useEffect(() => {
        if (!blog_id) {
            return setLoading(false);
        } else {
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id, mode: 'edit' })
                .then(({ data: { blog } }) => {
                    setBlog(blog);
                    setLoading(false);
                })
                .catch(err => {
                    setBlog(null);
                    setLoading(false);
                })
        }
    }, [])
    return (
        <EditorContext.Provider value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}>
            {
                access_token == null ? <Navigate to="/signin" />
                    :
                    loading ? <Loader /> :
                        editorState == "editor" ? <BlogEditor /> : <PublishForm />
            }
        </EditorContext.Provider>
    )
}

export default Editor;