import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../libs/data_handling_context"
import { GetFetch, PostFetch, PutFetch } from "../../libs/fetch"
import { TypeType } from "../../interface/type_type"
import { MyContext } from "../../libs/context"
import { AnnounceContext } from "../../libs/announce_context"
import { ToastifyContext } from "../../libs/toastify_context"
import { LoadingContext } from "../../libs/loading_context"
import Loader from "../base/loader"

export default function TypeInfo() {
    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const toastifyContext = useContext(ToastifyContext)
    const loadingContext=useContext(LoadingContext)
    const [object, setObject] = useState<TypeType | undefined>(undefined)

    useEffect(() => {
        if (dataContext?.id == -1)
            return
        loadingContext?.setStatus(true)
        GetFetch('type/' + dataContext?.id,
            (data: TypeType[]) => {
                setObject(data[0])
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            })
    }, [dataContext?.id])

    function handleAdd() {
        loadingContext?.setStatus(true)
        PostFetch('type',
            object,
            (data: any) => {
                object ? dataContext?.setList([...dataContext.list as TypeType[], {...object,id:data.id}]) : ''
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
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn sửa loại phòng " + object?.name +" ?")
        if (!result)
            return
        loadingContext?.setStatus(true)
        PutFetch('type/' + dataContext?.id,
            object,
            (data: any) => {
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
                <label htmlFor="name">Tên Loại</label><br />
                <input type="text" className="input" name="name" value={object?.name} onChange={(e) => setObject({ ...object, name: e.target.value })} />
            </div>
            <div className="component">
                <label htmlFor="price">Giá phòng/tháng</label><br />
                <input type="number" className="input" name="price" value={object?.priceFM} onChange={(e) => setObject({ ...object, priceFM: parseInt(e.target.value) })} />
            </div>
            <div className="component">
                <label htmlFor="price">Giá phòng/ngày</label><br />
                <input type="number" className="input" name="price" value={object?.priceFD} onChange={(e) => setObject({ ...object, priceFD: parseInt(e.target.value) })} />
            </div>
            <div className="component">
                <label htmlFor="electric">Số điện</label><br />
                <input type="number" className="input" name="electric" value={object?.electric} onChange={(e) => setObject({ ...object, electric: parseInt(e.target.value) })} />
            </div>
            <div className="component">
                <label htmlFor="water">Số nước</label><br />
                <input type="text" className="input" name="water" value={object?.water} onChange={(e) => setObject({ ...object, water: parseInt(e.target.value) })} />
            </div>
            <div className="component">
                <label htmlFor="water-follow">Nước tính theo</label><br />
                <select name="water-follow" className="input" id="" value={object?.water_follow||0} onChange={(e) => setObject({ ...object, water_follow: parseInt(e.target.value) })}>
                    <option value="0">Người</option>
                    <option value="1">Số</option>
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