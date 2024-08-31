import { createContext, useContext, useState } from "react";
import { DataContextType } from "../interface/data_context_type";
import { ContextProviderProps } from "../interface/context_provider_props";

const DataContext = createContext<DataContextType | undefined>(undefined);

function DataContextProvider({ children }: ContextProviderProps) {
    const [id, setId] = useState<number>(-1)
    const [type, setType] = useState<string>("")
    function setData(id: number, type: string) {
        setId(id);
        setType(type);
    }
    return (
        <DataContext.Provider value={{id, type, setData}}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext,DataContextProvider};