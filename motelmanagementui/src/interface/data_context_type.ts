import { PersonType } from "./person_type";
import { RoomType } from "./room_type";

export interface DataContextType{
    id?:number,
    type:string,
    setData:(id: number, type: string) => void,
    list:RoomType[]|PersonType[],
    setList:React.Dispatch<React.SetStateAction<RoomType[]|PersonType[]>>,
}