import { useContext, useEffect } from "react";
import RoomCard from "./roomcard";
import Search from "./search";
import { GetFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";

interface RoomType{
    id:number,
    name:string,
    type_name:string,
    check_in:Date,
    img_room:string
}

export default function RoomList() {
    const context=useContext(MyContext)
    useEffect(()=>{
        GetFetch('room',(data:RoomType[])=>{
            console.log(data)
        },context?.data)
    })
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"></div>
      </div>
      <div className="body-content">
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
}