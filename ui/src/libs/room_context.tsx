import { createContext, useState } from "react";
import { RoomType } from "../interface/room_type";
import { ContextProviderProps } from "../interface/context_provider_props";
import { RoomContextType } from "../interface/room_context_type";
// dont use
const RoomContext=createContext<RoomContextType|undefined>(undefined)

function RoomProvider({children}:ContextProviderProps){
    const [list,setList]=useState<RoomType[]>([]);
    return(
        <RoomContext.Provider value={{list,setList}}>
            {children}
        </RoomContext.Provider>
    )
}

export {RoomContext,RoomProvider}