import { useContext } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import BlogEditor from "../components/blog-editor.component.jsx"
import PublishForm from "../components/publish-form.component.jsx"

const Editor = () => {
    const [editorState, setEditorState] = useState("editor");
    let { userAuth: { access_token } } = useContext(UserContext);
    return (
        access_token == null ? <Navigate to="/signin" />
            : editorState == "editor" ? <BlogEditor /> : <PublishForm />
    )
}

export default Editor;