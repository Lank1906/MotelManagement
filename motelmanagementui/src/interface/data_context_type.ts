import { PersonType } from "./person_type";
import { RoomType } from "./room_type";
import { TypeType } from "./type_type";

export interface DataContextType{
    id?:number,
    type:string,
    setData:(id: number, type: string) => void,
    list:TypeType[]|RoomType[]|PersonType[]|undefined,
    setList:React.Dispatch<React.SetStateAction<TypeType[]|RoomType[]|PersonType[]|undefined>>,
}