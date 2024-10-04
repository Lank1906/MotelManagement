import { useContext, useEffect } from "react";
import Search from "./search";
import { GetFetch } from "../libs/fetch";
import { TypeType } from "../interface/type_type";
import { DataContext } from "../libs/data_handling_context";
import { MyContext } from "../libs/context";
import Loader from "./loader";

export default function TypeList() {
    const dataContext=useContext(DataContext);
    const context=useContext(MyContext)

    useEffect(()=>{
        GetFetch('type',(data:TypeType[])=>{
            dataContext?.setList(data)
        },context?.data)
    },[])

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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataContext?.list ? dataContext.list.map((item:TypeType)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{item.type_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.electric}</td>
                                        <td>{item.water}</td>
                                        <td>{item.water_follow}</td>
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