import { RoomType } from "./room_type";
// dont use
export interface RoomContextType{
    list:RoomType[],
    setList:React.Dispatch<React.SetStateAction<RoomType[]>>,
}