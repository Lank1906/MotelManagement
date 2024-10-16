import { PersonType } from "./person_type";
import { RoomType } from "./room_type";
import ServiceType from "./service_type";
import { TypeType } from "./type_type";

export interface DataContextType{
    id?:number,
    type:string,
    setData:(id: number, type: string) => void,
    list:ServiceType[]|TypeType[]|RoomType[]|PersonType[]|undefined,
    setList:React.Dispatch<React.SetStateAction<ServiceType[]|TypeType[]|RoomType[]|PersonType[]|undefined>>,
}