import { Edit } from "lucide-react";
import { useContext } from "react";


const Tag=({tag})=>{
    let{}=useContext(EditorContext);
    const addEditable=(e)=>{
        e.target.setAttribute("contentEditable","true");
        e.target.focus();
    }
    const handleTagDelete=()=>{
        //logic to delete tag
        tags=tags.filter(t=>t!=tag);
       setBlog({...blog,tags:tags});
    }
    const handleTagEdit=(e)=>{
        //logic to edit tag
        if(e.keyCode==13){
            e.preventDefault();
            let currentTag=e.target.innerText;
            tags[tagindex]=currentTag;
            setBlog({...blog,tags:tags});
            e.target.setAttribute("contentEditable","false");
        }
    }
    return(
        <div className="realtive p-2 mt-2 mr-2 px-2 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
            <p className="outline-none" onKeyDown={handleTagEdit} onClick={addEditable}>{tag}</p>
            <button
            className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
                onClick={handleTagDelete}
            >
                <i className="fi fi-tr-cross-small text-xl pointer-events-none"></i>
            </button>
        </div>
    );
}

export default Tag;
