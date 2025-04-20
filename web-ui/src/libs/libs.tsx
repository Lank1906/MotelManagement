import { PostImage } from "./fetch";
import { AnnounceContextType } from "../interface/announce_context_type";
import { MyContextType } from "../interface/my_context_type";

function YMDtoDMY(date: string | undefined): string | undefined {
    if (!date)
        return;
    let x = date.split('-')
    return x[2] + '-' + x[1] + '-' + x[0]
}

async function uploadImage(element: HTMLInputElement, announceContext: AnnounceContextType | undefined, context: MyContextType | undefined) {
    const fileInput = element
    const formData = new FormData();
    let filename = "";
    if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);

        await PostImage('api/upload', formData, (data) => {
            filename = data
        }, context?.data);
    }
    if (filename != "") {
        announceContext?.setMessage(filename + "has been uploaded")
        announceContext?.setType("success")
        announceContext?.setClose(true)
    }
    else {
        announceContext?.setMessage(filename + "has been failed")
        announceContext?.setType("danger")
        announceContext?.setClose(true)
    }
    return filename;
}

export { uploadImage, YMDtoDMY }