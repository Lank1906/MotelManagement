import { createContext, useState } from "react";
import { ContextProviderProps } from "../interface/context_provider_props";
import { LoadingStatusType } from "../interface/loading_context_type";

const LoadingContext=createContext<LoadingStatusType|undefined>(undefined);

function LoadingContextProvider({children}:ContextProviderProps){
    const [status,setStatus]=useState<boolean>(true)

    return (
        <LoadingContext.Provider value={{status,setStatus}}>
            {children}
        </LoadingContext.Provider>
    )
}

export {LoadingContext,LoadingContextProvider}