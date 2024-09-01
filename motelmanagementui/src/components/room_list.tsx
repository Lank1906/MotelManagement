import { useContext, useEffect, useState } from "react";
import RoomCard from "./roomcard";
import Search from "./search";
import { GetFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { RoomType } from "../interface/room_type";
import { DataContext } from "../libs/data_handling_context";

export default function RoomList() {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const [list, setList] = useState<RoomType[]>([]);
  useEffect(() => {
    GetFetch('room', (data: RoomType[]) => {
      setList(data)
    }, context?.data)
  }, [])
  return (
    <div className="content">
      <div className="top-content">
        <Search />
        <div className="like-search"></div>
      </div>
      <div className="body-content">
        {list ? list.map((item: RoomType) => {
          return (
            <div onClick={() => {dataContext?.setData(item.id, 'room')}} key={item.id}>
              <RoomCard {...item}  />
            </div>
          )
        }) : "Loading ..."}
      </div>
    </div>
  );
}