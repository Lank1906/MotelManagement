import { createContext, useState } from "react";
import { DataContextType } from "../interface/data_context_type";
import { ContextProviderProps } from "../interface/context_provider_props";
import { RoomType } from "../interface/room_type";
import { PersonType } from "../interface/person_type";

const DataContext = createContext<DataContextType | undefined>(undefined);

function DataContextProvider({ children }: ContextProviderProps) {
    const [id, setId] = useState<number>(-1)
    const [type, setType] = useState<string>("room")
    const [list,setList]=useState<RoomType[]|PersonType[]|undefined>(undefined)
    function setData(id: number, type: string) {
        setId(id);
        setType(type);
    }
    return (
        <DataContext.Provider value={{id, type, setData,list,setList}}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext,DataContextProvider};