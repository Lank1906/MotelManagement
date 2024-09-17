import { createContext, useState } from "react";
import { ToastifyContextType } from "../interface/toastify_context_type";
import { ContextProviderProps } from "../interface/context_provider_props";

const ToastifyContext=createContext<ToastifyContextType|undefined>(undefined)

function ToastifyProvider({children}:ContextProviderProps){
    const [message,setMessage]=useState<string>("")
    const [close,setClose]=useState<boolean>(false)
    const [result,setResult]=useState<boolean>(false)

    function confirmResult(message:string):Promise<boolean>{
        return new Promise((resolve)=>{
            setMessage(message)
            setClose(true)

            const interval = setInterval(()=>{
                setClose((prevClose) => {
                    if (!prevClose) {
                        clearInterval(interval); // Dừng kiểm tra
                        resolve(result); // Trả về kết quả của người dùng
                    }
                    return prevClose; // Giữ nguyên trạng thái hiện tại
                });
            },500)
        })
    }

    return(
        <ToastifyContext.Provider value={{message,setMessage,close,setClose,result,setResult,confirmResult}}>
            {children}
        </ToastifyContext.Provider>
    )
}

export {ToastifyContext,ToastifyProvider}