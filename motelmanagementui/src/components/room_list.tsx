import { useContext, useEffect, useState } from "react";
import RoomCard from "./roomcard";
import Search from "./search";
import { GetFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { RoomType } from "../interface/room_type";

export default function RoomList() {
    const context=useContext(MyContext)
    const [list,setList]=useState<RoomType[]>([]);
    useEffect(()=>{
        GetFetch('room',(data:RoomType[])=>{
            setList(data)
        },context?.data)
    })
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"></div>
      </div>
      <div className="body-content">
        {list? list.map((item:RoomType)=>{
          return (<RoomCard {...item} key={item.id}/>)
        }):"Loading ..."}
      </div>
    </div>
  );
}