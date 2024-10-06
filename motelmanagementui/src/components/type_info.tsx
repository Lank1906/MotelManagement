import { useContext, useEffect, useState } from "react"
import { DataContext } from "../libs/data_handling_context"
import { GetFetch } from "../libs/fetch"
import { TypeType } from "../interface/type_type"
import { MyContext } from "../libs/context"

export default function TypeInfo(){
    const context=useContext(MyContext)
    const dataContext=useContext(DataContext)
    const [object,setObject]=useState<TypeType>()

    useEffect(()=>{
        GetFetch('type/'+dataContext?.id,(data:TypeType)=>{
            setObject(data)
        },context?.data)
    },[dataContext?.id])
    
    return (
        <div className="form">
            <div className="input">
                <label htmlFor="name">Ten loai</label><br/>
                <input type="text" name="name"/>
            </div>
            <div className="input">
                <label htmlFor="price">Gia phong</label><br/>
                <input type="number" name="price"/>
            </div>
            <div className="input">
                <label htmlFor="electric">So dien</label><br/>
                <input type="number" name="electric"/>
            </div>
            <div className="input">
                <label htmlFor="water">So nuoc</label><br/>
                <input type="text" name="water"/>
            </div>
            <div className="input">
                <label htmlFor="water-follow">Nuoc tinh theo </label><br/>
                <input type="text" name="water-follow"/>
            </div>
        </div>
    )
}