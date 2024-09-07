import { RoomType } from "./room_type";

export interface RoomContextType{
    list:RoomType[],
    setList:React.Dispatch<React.SetStateAction<RoomType[]>>,
}