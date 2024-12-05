import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../libs/data_handling_context"
import { GetFetch, PostFetch, PutFetch } from "../../libs/fetch"
import { TypeType } from "../../interface/type_type"
import { MyContext } from "../../libs/context"
import { AnnounceContext } from "../../libs/announce_context"
import { ToastifyContext } from "../../libs/toastify_context"

export default function TypeInfo() {
    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const toastifyContext = useContext(ToastifyContext)
    const [object, setObject] = useState<TypeType | undefined>(undefined)

    useEffect(() => {
        if (dataContext?.id == -1)
            return
        GetFetch('type/' + dataContext?.id,
            (data: TypeType[]) => {
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
        console.log(object)
        PostFetch('type',
            object,
            (data: any) => {
                object ? dataContext?.setList([...dataContext.list as TypeType[], {...object,id:data.id}]) : ''
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
                <label htmlFor="price">Gia phong</label><br />
                <input type="number" name="price" value={object?.price} onChange={(e) => setObject({ ...object, price: parseInt(e.target.value) })} />
            </div>
            <div className="input">
                <label htmlFor="electric">So dien</label><br />
                <input type="number" name="electric" value={object?.electric} onChange={(e) => setObject({ ...object, electric: parseInt(e.target.value) })} />
            </div>
            <div className="input">
                <label htmlFor="water">So nuoc</label><br />
                <input type="text" name="water" value={object?.water} onChange={(e) => setObject({ ...object, water: parseInt(e.target.value) })} />
            </div>
            <div className="input">
                <label htmlFor="water-follow">Nuoc tinh theo </label><br />
                <select name="water-follow" id="" value={object?.water_follow||0} onChange={(e) => setObject({ ...object, water_follow: parseInt(e.target.value) })}>
                    <option value="0">Nguoi</option>
                    <option value="1">So</option>
                </select>
            </div>
            <div className="action">
                <button className="btn" onClick={handleAdd}>Thêm Mới</button>
                <button className="btn" onClick={handleUpdate}>Sửa đổi</button>
            </div>
        </div>
    )
}