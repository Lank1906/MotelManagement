import { createContext, useState } from "react";
import { ToastifyContextType } from "../interface/toastify_context_type";
import { ContextProviderProps } from "../interface/context_provider_props";

const ToastifyContext=createContext<ToastifyContextType|undefined>(undefined)

function ToastifyProvider({children}:ContextProviderProps){
    const [message,setMessage]=useState<string>("")
    const [close,setClose]=useState<boolean>(false)
    var result=false

    return(
        <ToastifyContext.Provider value={{message,setMessage,close,setClose,result}}>
            {children}
        </ToastifyContext.Provider>
    )
}

export {ToastifyContext,ToastifyProvider}