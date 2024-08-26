import { createContext, ReactNode, useState } from "react";

interface AnnounceContextType{
    message:string;
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    type?:string;
    setType: React.Dispatch<React.SetStateAction<string>>,
    close:boolean,
    setClose:React.Dispatch<React.SetStateAction<boolean>>,
}

const AnnounceContext = createContext<AnnounceContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

function AnnounceProvider({children}:ContextProviderProps){
    const [message,setMessage]=useState<string>("");
    const [type,setType]=useState<string>("");
    const [close,setClose]=useState<boolean>(true)
    return(
        <AnnounceContext.Provider value={{message,setMessage,type,setType,close,setClose}}>
            {children}
        </AnnounceContext.Provider>
    );
}

export {AnnounceContext,AnnounceProvider}