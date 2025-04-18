import { useContext, useEffect } from "react"
import Search from "../base/search"
import { MyContext } from "../../libs/context"
import { DataContext } from "../../libs/data_handling_context";
import { ToastifyContext } from "../../libs/toastify_context";
import { AnnounceContext } from "../../libs/announce_context";
import { DeleteFetch, GetFetch } from "../../libs/fetch";
import ServiceType from "../../interface/service_type";
import { TypeType } from "../../interface/type_type";
import { RoomType } from "../../interface/room_type";
import { PersonType } from "../../interface/person_type";
import Loader from "../base/loader";
import { LoadingContext } from "../../libs/loading_context";

export default function ServiceList() {
    const dataContext = useContext(DataContext);
    const toastifyContext = useContext(ToastifyContext)
    const announceContext = useContext(AnnounceContext)
    const context = useContext(MyContext)
    const loadingContext = useContext(LoadingContext)

    useEffect(() => {
        if(!dataContext?.type)
            return
        loadingContext?.setStatus(true)
        GetFetch(dataContext.type,
            (data: any) => {
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

    async function handleDelete(id: number | undefined, name: string | undefined) {
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa dịch vụ " + name + " ?")
        if (!result || id == undefined) return
        loadingContext?.setStatus(true)
        DeleteFetch(dataContext?.type + '/' + id,
            (data: any) => {
                let tam = (dataContext?.list as ServiceType[]).filter((item: ServiceType) => item.id !== id)
                dataContext?.setList(tam)
                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            })
    }

    const isServiceArray = (arr: ServiceType[] | TypeType[] | RoomType[] | PersonType[] | undefined): arr is ServiceType[] => { return true };
    return (
        <div className="body-content">
            <table>
                <thead>
                    <tr>
                        <th>Tên dịch vụ</th>
                        <th>Tính theo</th>
                        <th>Giá</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isServiceArray(dataContext?.list) && dataContext?.list ? dataContext.list.map((item: ServiceType) => {
                            return (
                                <tr key={item.id} onClick={() => dataContext.setData(item.id || -1, 'service')}>
                                    <td>{item.name}</td>
                                    <td>{item.follow ? 'Lượt sử dụng' : 'tháng'}</td>
                                    <td>{item.price}</td>
                                    <td><button className="btn delete" onClick={() => handleDelete(item.id, item.name)}><i className="fa-solid fa-trash"></i></button></td>
                                </tr>
                            )
                        }) : ''
                    }
                </tbody>
            </table>
            {loadingContext?.status ? <Loader /> : ''}
        </div>
    )
}