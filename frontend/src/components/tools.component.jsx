import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

import {uploadImage} from "../common/aws";

const uploadByFile= (e) => {
    return uploadImage(e).then(url => {
        if(url){
            return {
                success:1,
                file:{
                    url:url
                }
            }
        }
    })

}
const uploadImaegeByUrl = (e) => {
    let link=new Promise((resolve,reject)=>{
        try{
            resolve(e)
        }
        catch(err){
            reject(err)
        }
    })
    return link.then(url=>{
        return {
            success:1,
            file:{
                url:url
            }
        }
    })
}
export const tools = {
    embed: Embed,
    table: Table,
    list:{
        class: List,
        inlineToolbar: true,
    },
    image: {
        class: Image,
        config: {
            uploader:{
                uploadByUrl:uploadImaegeByUrl,
                uploadByFile:uploadByFile
            }
        },
    },
    header: {
        class: Header,
        config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 2,
        },
    },
    quote:{
        class: Quote,
        inlineToolbar: true,
    },
    marker: Marker,
    inlineCode: InlineCode,
}