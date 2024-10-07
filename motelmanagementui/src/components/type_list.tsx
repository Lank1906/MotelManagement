import { useContext, useEffect } from "react";
import Search from "./search";
import { GetFetch } from "../libs/fetch";
import { TypeType } from "../interface/type_type";
import { DataContext } from "../libs/data_handling_context";
import { MyContext } from "../libs/context";
import Loader from "./loader";
import { PersonType } from "../interface/person_type";
import { RoomType } from "../interface/room_type";

export default function TypeList() {
    const dataContext=useContext(DataContext);
    const context=useContext(MyContext)

    useEffect(()=>{
        GetFetch('type',(data:TypeType[])=>{
            dataContext?.setList(data)
        },context?.data)
    },[])

    const isTypeArray=(arr:TypeType[]|RoomType[]|PersonType[]|undefined):arr is TypeType[]=>{return true}

    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content">
                <table>
                    <thead>
                        <tr>
                            <th>Ten Loai</th>
                            <th>Gia /thang</th>
                            <th>So dien</th>
                            <th>Nuoc</th>
                            <th>Nuoc tinh theo</th>
                            <th>Thao tac</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isTypeArray(dataContext?.list) && dataContext?.list ? dataContext.list.map((item:TypeType)=>{
                                return (
                                    <tr key={item.id} onClick={()=>dataContext.setData(item.id||-1,'type')}>
                                        <td>{item.type_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.electric}</td>
                                        <td>{item.water}</td>
                                        <td>{item.water_follow ? 'nguoi':'so'}</td>
                                        <td><button className="btn">Xoa</button></td>
                                    </tr>
                                )
                            }):<Loader/>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}