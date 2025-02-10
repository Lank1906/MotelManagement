import { createContext, useState } from "react";
import { ContextProviderProps } from "../interface/context_provider_props";
import { AnnounceContextType } from "../interface/announce_context_type";

const AnnounceContext = createContext<AnnounceContextType | undefined>(undefined);

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