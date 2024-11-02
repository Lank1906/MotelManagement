import { useContext, useEffect, useState } from "react"
import ServiceType from "../../interface/service_type"
import { MyContext } from "../../libs/context"
import { DataContext } from "../../libs/data_handling_context"
import { AnnounceContext } from "../../libs/announce_context"
import { ToastifyContext } from "../../libs/toastify_context"
import { GetFetch, PostFetch, PutFetch } from "../../libs/fetch"

export default function ServiceInfo() {
    const [object, setObject] = useState<ServiceType | undefined>(undefined)
    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const toastifyContext = useContext(ToastifyContext)

    useEffect(() => {
        if (dataContext?.id === -1)
            return
        GetFetch('service/' + dataContext?.id,
            (data: ServiceType[]) => {
                setObject(data[0])
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [dataContext?.id])

    function handleAdd() {
        PostFetch('service',
            object,
            (data: any) => {
                object ? dataContext?.setList([...dataContext.list as ServiceType[], {...object,id:data.id}]) : ''
                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }

    async function handleUpdate() {
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn sửa loai phòng " + object?.name)
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
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }

    return (
        <div className="form">
            <div className="input">
                <label htmlFor="name">Ten loai</label><br />
                <input type="text" name="name" value={object?.name} onChange={(e) => setObject({ ...object, name: e.target.value })} />
            </div>
            <div className="input">
                <label htmlFor="price">Gia thanh</label><br />
                <input type="number" name="price" value={object?.price} onChange={(e) => setObject({ ...object, price: parseInt(e.target.value) })} />
            </div>
            <div className="input">
                <label htmlFor="water-follow">Tien tinh theo </label><br />
                <select name="water-follow" id="" value={object?.follow ? 'true' : 'false'} onChange={(e) => setObject({ ...object, follow: e.target.value === "true" })}>
                    <option value="false">Thang</option>
                    <option value="true">So lan su dung</option>
                </select>
            </div>
            <div className="action">
                <button className="btn" onClick={handleAdd}>Thêm Mới</button>
                <button className="btn" onClick={handleUpdate}>Sửa đổi</button>
            </div>
        </div>
    )
}