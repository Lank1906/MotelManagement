import { useContext, useEffect, useState } from "react"
import Search from "./search"
import { MyContext } from "../libs/context"
import { GetFetch } from "../libs/fetch";
import { PersonType } from "../interface/person_type";
import PersonCard from "./personcard";
import { DataContext } from "../libs/data_handling_context";
import { RoomType } from "../interface/room_type";
import { TypeType } from "../interface/type_type";

export default function PersonList() {
    const context = useContext(MyContext);
    const dataContext = useContext(DataContext)
    useEffect(() => {
        GetFetch('renter', (data: PersonType[]) => {
            dataContext?.setList(data)
        }, context?.data)
    }, [])
    const isPersonArray = (arr: TypeType[]|RoomType[] | PersonType[] | undefined): arr is PersonType[] => { return true }
    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content">
                {isPersonArray(dataContext?.list) && dataContext?.list ? dataContext.list.map((item: PersonType) => {
                    return (
                        <div onClick={() => { dataContext?.setData(item.id, 'renter') }} key={item.id}>
                            <PersonCard {...item}  /></div>
                    )
                }) : "Loading ..."}
            </div>
        </div>
    )
}