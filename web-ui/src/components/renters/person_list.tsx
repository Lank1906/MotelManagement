import { useContext, useEffect, useState } from "react"
import Search from "../base/search"
import { MyContext } from "../../libs/context"
import { GetFetch } from "../../libs/fetch";
import { PersonType } from "../../interface/person_type";
import PersonCard from "./personcard";
import { DataContext } from "../../libs/data_handling_context";
import { RoomType } from "../../interface/room_type";
import { TypeType } from "../../interface/type_type";
import { AnnounceContext } from "../../libs/announce_context";
import Loader from "../base/loader";
import { LoadingContext } from "../../libs/loading_context";

export default function PersonList() {
    const context = useContext(MyContext);
    const dataContext = useContext(DataContext);
    const announceContext = useContext(AnnounceContext);
    const loadingContext = useContext(LoadingContext);

    useEffect(() => {
        if(!dataContext?.type)
            return
        GetFetch(dataContext.type,
            (data: PersonType[]) => {
                dataContext?.setList(data)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [])

    const isPersonArray = (arr: TypeType[] | RoomType[] | PersonType[] | undefined): arr is PersonType[] => { return true }

    return (
        <div className="body-content">
            {isPersonArray(dataContext?.list) && dataContext?.list && !loadingContext?.status ? dataContext.list.map((item: PersonType) => {
                return (
                    <div onClick={() => { dataContext?.setData(item.id, 'room-rent') }} key={item.id}>
                        <PersonCard {...item} /></div>
                )
            }) : <Loader />}
        </div>
    )
}