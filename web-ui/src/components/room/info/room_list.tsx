import { useContext, useEffect, useState } from "react";
import RoomCard from "./roomcard";
import Search from "../../base/search";
import { GetFetch } from "../../../libs/fetch";
import { MyContext } from "../../../libs/context";
import { RoomType } from "../../../interface/room_type";
import { DataContext } from "../../../libs/data_handling_context";
import { PersonType } from "../../../interface/person_type";
import Loader from "../../base/loader";
import { TypeType } from "../../../interface/type_type";
import { AnnounceContext } from "../../../libs/announce_context";
import { LoadingContext } from "../../../libs/loading_context";

export default function RoomList() {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const announceContext = useContext(AnnounceContext)
  const loadingContext = useContext(LoadingContext)

  useEffect(() => {
    loadingContext?.setStatus(true)
    GetFetch('room',
      (data: RoomType[]) => {
        dataContext?.setList(data)
        loadingContext?.setStatus(false)
      },
      context?.data,
      (data: any) => {
        announceContext?.setMessage(data.message)
        announceContext?.setType("danger")
        announceContext?.setClose(true)
        loadingContext?.setStatus(false)
      })
  }, [])

  const isRoomArray = (arr: TypeType[] | RoomType[] | PersonType[] | undefined): arr is RoomType[] => { return true }

  return (
    <div className="body-content">
      {isRoomArray(dataContext?.list) && dataContext?.list && !loadingContext?.status ? dataContext.list.map((item: RoomType) => {
        return (
          <div onClick={() => { dataContext?.setData(item.id, 'room') }} key={item.id} style={{ height: "fit-content" }}>
            <RoomCard {...item} />
          </div>
        )
      }) : <Loader />}
    </div>
  );
}