import { useContext, useEffect } from "react";
import Search from "../base/search";
import { DeleteFetch, GetFetch } from "../../libs/fetch";
import { TypeType } from "../../interface/type_type";
import { DataContext } from "../../libs/data_handling_context";
import { MyContext } from "../../libs/context";
import Loader from "../base/loader";
import { PersonType } from "../../interface/person_type";
import { RoomType } from "../../interface/room_type";
import { ToastifyContext } from "../../libs/toastify_context";
import { AnnounceContext } from "../../libs/announce_context";
import ServiceType from "../../interface/service_type";
import { LoadingContext } from "../../libs/loading_context";

export default function TypeList() {
    const dataContext = useContext(DataContext);
    const toastifyContext = useContext(ToastifyContext)
    const announceContext = useContext(AnnounceContext)
    const context = useContext(MyContext)
    const loadingContext = useContext(LoadingContext)

    useEffect(() => {
        loadingContext?.setStatus(true)
        GetFetch('type',
            (data: TypeType[]) => {
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
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa loại phòng " + name + " không?")
        if (result || !id) return
        DeleteFetch('type/' + id,
            (data: any) => {
                let tam = (dataContext?.list as TypeType[]).filter((item: TypeType) => item.id !== id)
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

    const isTypeArray = (arr: ServiceType[] | TypeType[] | RoomType[] | PersonType[] | undefined): arr is TypeType[] => { return true }

    return (
        <div className="body-content">
            <table>
                <thead>
                    <tr>
                        <th>Tên Loại</th>
                        <th>Giá/tháng</th>
                        <th>Giá điện</th>
                        <th>Giá Nước</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isTypeArray(dataContext?.list) && dataContext?.list ? dataContext.list.map((item: TypeType) => {
                            return (
                                <tr key={item.id} onClick={() => dataContext.setData(item.id || -1, 'type')}>
                                    <td>{item.name}</td>
                                    <td>{item.priceFM}</td>
                                    <td>{item.electric}</td>
                                    <td>{item.water}{item.water_follow ? '/người' : '/số'}</td>
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