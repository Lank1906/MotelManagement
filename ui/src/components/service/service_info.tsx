import { useContext, useEffect, useState } from "react"
import ServiceType from "../../interface/service_type"
import { MyContext } from "../../libs/context"
import { DataContext } from "../../libs/data_handling_context"
import { AnnounceContext } from "../../libs/announce_context"
import { ToastifyContext } from "../../libs/toastify_context"
import { GetFetch, PostFetch, PutFetch } from "../../libs/fetch"
import { LoadingContext } from "../../libs/loading_context"
import Loader from "../base/loader"

export default function ServiceInfo() {
    const [object, setObject] = useState<ServiceType | undefined>(undefined)
    const context = useContext(MyContext)
    const loadingContext=useContext(LoadingContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const toastifyContext = useContext(ToastifyContext)

    useEffect(() => {
        if (dataContext?.id === -1)
            return
        GetFetch('service/' + dataContext?.id,
            (data: ServiceType[]) => {
                setObject(data[0])
                loadingContext?.setStatus(false)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [dataContext?.id])

    function handleAdd() {
        loadingContext?.setStatus(true)
        PostFetch('service',
            object,
            (data: any) => {
                object ? dataContext?.setList([...dataContext.list as ServiceType[], {...object,id:data.id}]) : ''
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

    async function handleUpdate() {
        loadingContext?.setStatus(true)
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn sửa dịch vụ " + object?.name+" ?")
        if (!result)
            return
        PutFetch('service/' + dataContext?.id,
            object,
            (data: any) => {
                let tam = [...dataContext?.list as ServiceType[]].map((item: any) => {
                    if (item.id == object?.id) {
                        item = object;
                    }
                    return item;
                });
                dataContext?.setList(tam);
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

    return (
        <div className="form">
            <div className="component">
                <label htmlFor="name">Tên dịch vụ</label><br />
                <input className="input" type="text" name="name" value={object?.name} onChange={(e) => setObject({ ...object, name: e.target.value })} />
            </div>
            <div className="component">
                <label htmlFor="price">Giá thành</label><br />
                <input className="input" type="number" name="price" value={object?.price} onChange={(e) => setObject({ ...object, price: parseInt(e.target.value) })} />
            </div>
            <div className="component">
                <label htmlFor="water-follow">Tiền tính theo</label><br />
                <select className="input" name="water-follow" id="" value={object?.follow ? 'true' : 'false'} onChange={(e) => setObject({ ...object, follow: e.target.value === "true" })}>
                    <option value="false">Tháng</option>
                    <option value="true">Số lần sử dụng</option>
                </select>
            </div>
            <div className="action">
                <button className="btn add" onClick={handleAdd}><i className="fa-solid fa-plus"></i> Thêm Mới</button>
                <button className="btn update" onClick={handleUpdate}><i className="fa-solid fa-rotate"></i> Sửa đổi</button>
            </div>
            {loadingContext?.status?<Loader/>:''}
        </div>
    )
}