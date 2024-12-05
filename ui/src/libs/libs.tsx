import { useContext } from "react";
import { PostImage } from "./fetch";
import { AnnounceContext } from "./announce_context";
import { MyContext } from "./context";
import { AnnounceContextType } from "../interface/announce_context_type";
import { MyContextType } from "../interface/my_context_type";



async function uploadImage(element:HTMLInputElement,announceContext:AnnounceContextType|undefined,context:MyContextType|undefined) {
    // const announceContext=useContext(AnnounceContext)
    // const context=useContext(MyContext)
    const fileInput = element
    const formData = new FormData();
    let filename = "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);

        await PostImage('api/upload', formData, (data) => {
            filename = data
        }, context?.data);
    }
    if(filename != ""){
        announceContext?.setMessage(filename + "has been uploaded")
        announceContext?.setType("success")
        announceContext?.setClose(true)
    }
    else{
        announceContext?.setMessage(filename + "has been failed")
        announceContext?.setType("danger")
        announceContext?.setClose(true)
    }
    return filename;
}

export {uploadImage}