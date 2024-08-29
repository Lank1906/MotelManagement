import { useContext, useEffect, useState } from "react"
import Search from "./search"
import { MyContext } from "../libs/context"
import { GetFetch } from "../libs/fetch";
import { PersonType } from "../interface/person_type";
import PersonCard from "./personcard";

export default function PersonList() {
    const context=useContext(MyContext);
    const [list,setList]=useState<PersonType[]>([])
    useEffect(()=>{
        GetFetch('renter',(data:PersonType[])=>{
            setList(data)
        },context?.data)
    },[])
    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content">
                {list ? list.map((item: PersonType) => {
                    return (<PersonCard {...item} key={item.id} />)
                }) : "Loading ..."}
            </div>
        </div>
    )
}