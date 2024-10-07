import { useContext, useEffect, useState } from "react"
import { DataContext } from "../libs/data_handling_context"
import { GetFetch, PostFetch, PutFetch } from "../libs/fetch"
import { TypeType } from "../interface/type_type"
import { MyContext } from "../libs/context"
import { AnnounceContext } from "../libs/announce_context"
import { ToastifyContext } from "../libs/toastify_context"

export default function TypeInfo(){
    const context=useContext(MyContext)
    const dataContext=useContext(DataContext)
    const announceContext=useContext(AnnounceContext)
    const toastifyContext=useContext(ToastifyContext)
    const [object,setObject]=useState<TypeType|undefined>(undefined)

    useEffect(()=>{
        GetFetch('type/'+dataContext?.id,(data:TypeType[])=>{
            setObject(data[0])
        },context?.data)
    },[dataContext?.id])

    function handleAdd(){
        PostFetch('type',object,(data:any)=>{
            object?dataContext?.setList([...dataContext.list as TypeType[],object]):''
            announceContext?.setMessage(data.message)
            announceContext?.setType("success")
            announceContext?.setClose(true)
        },context?.data)
    }

    async function handleUpdate(){
        const result=await toastifyContext?.confirmResult("Bạn có chắc chắn muốn sửa loai phòng "+object?.type_name)
        if(!result)
            return
        PutFetch('type/'+dataContext?.id,object,(data:any)=>{
            let tam = [...dataContext?.list as TypeType[]].map((item: any) => {
                if (item.id == object?.id) {
                    item = object;
                }
                return item;
            });
            dataContext?.setList(tam);
            announceContext?.setMessage(data.message)
            announceContext?.setType("success")
            announceContext?.setClose(true)
        },context?.data)
    }
    
    return (
        <div className="form">
            <div className="input">
                <label htmlFor="name">Ten loai</label><br/>
                <input type="text" name="name" value={object?.type_name} onChange={(e)=>setObject({...object,type_name:e.target.value})}/>
            </div>
            <div className="input">
                <label htmlFor="price">Gia phong</label><br/>
                <input type="number" name="price" value={object?.price}/>
            </div>
            <div className="input">
                <label htmlFor="electric">So dien</label><br/>
                <input type="number" name="electric" value={object?.electric}/>
            </div>
            <div className="input">
                <label htmlFor="water">So nuoc</label><br/>
                <input type="text" name="water" value={object?.water}/>
            </div>
            <div className="input">
                <label htmlFor="water-follow">Nuoc tinh theo </label><br/>
                <input type="text" name="water-follow" value={object?.water_follow?'nguoi':'so'}/>
            </div>
            <div className="action">
                <button className="btn" onClick={handleAdd}>Thêm Mới</button>
                <button className="btn" onClick={handleUpdate}>Sửa đổi</button>
            </div>
        </div>
    )
}