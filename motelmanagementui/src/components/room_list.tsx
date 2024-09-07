import { useContext, useEffect, useState } from "react";
import RoomCard from "./roomcard";
import Search from "./search";
import { GetFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { RoomType } from "../interface/room_type";
import { DataContext } from "../libs/data_handling_context";
import { PersonType } from "../interface/person_type";

export default function RoomList() {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  useEffect(() => {
    GetFetch('room', (data: RoomType[]) => {
      dataContext?.setList(data)
    }, context?.data)
  }, [])
  const isRoomArray=(arr:RoomType[]|PersonType[]|undefined):arr is RoomType[]=>{return true}
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"></div>
      </div>
      <div className="body-content">
        {isRoomArray(dataContext?.list) ? dataContext.list.map((item:RoomType) => {
          return (
            <div onClick={() => {dataContext?.setData(item.id, 'room')}} key={item.id} style={{height:"fit-content"}}>
              <RoomCard {...item}  />
            </div>
          )
        }) : "Loading ..."}
      </div>
    </div>
  );
}