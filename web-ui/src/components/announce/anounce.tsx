import { useContext, useEffect, useState } from "react"
import { ToastifyContext } from "../../libs/toastify_context"
import { AnnounceContext } from "../../libs/announce_context"
import { MyContext } from "../../libs/context"
import { LoadingContext } from "../../libs/loading_context"
import AnnounceType from "../../interface/announce_type"
import { DeleteFetch, GetFetch } from "../../libs/fetch"
import { DataContext } from "../../libs/data_handling_context"
import Loader from "../base/loader"

export default function AnnounceList() {
    const dataContext = useContext(DataContext)
    const toastifyContext = useContext(ToastifyContext)
    const announceContext = useContext(AnnounceContext)
    const context = useContext(MyContext)
    const loadingContext = useContext(LoadingContext)

    const [announceByMe, setAnnounceByMe] = useState<AnnounceType[] | undefined>(undefined);
    const [announceForMe, setAnnounceForMe] = useState<AnnounceType[] | undefined>(undefined);

    useEffect(() => {
        if (!dataContext?.type)
            return
        loadingContext?.setStatus(true)
        GetFetch(dataContext?.type + '/by-me',
            (data: AnnounceType[]) => {
                setAnnounceByMe(data)
            },
            context?.data,
            (err: any) => {
                announceContext?.setMessage(err.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            }
        )
        GetFetch(dataContext?.type + '/for-me',
            (data: AnnounceType[]) => {
                setAnnounceForMe(data)
            },
            context?.data,
            (err: any) => {
                announceContext?.setMessage(err.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            }
        )
        loadingContext?.setStatus(false)
    }, [])

    async function handleDelete(id: number | undefined) {
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa thông báo này không ?")
        if (!result || id == undefined || !announceByMe) return
        loadingContext?.setStatus(true)
        DeleteFetch(dataContext?.type + '/' + id,
            (data: any) => {
                let tam = announceByMe.filter((item: AnnounceType) => item.id !== id)
                setAnnounceByMe(tam)
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
        <div className="body-content">
            <p>Lưu Ý: Hãy xóa thông báo của bạn khi không cần thiết nữa!</p>
            <div>Thông báo được gửi bởi bạn.</div>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Nội dung</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        announceByMe && announceByMe.length > 0 ?
                            announceByMe.map((item: AnnounceType) => (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.message}</td>
                                    <td><button className="btn delete" onClick={()=>handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button></td>
                                </tr>
                            )) :
                            <tr><td colSpan={3}>Không có thông báo nào.</td></tr>
                    }
                </tbody>
            </table>
            <div>Thông báo dành cho bạn</div>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Nội dung</th>
                    </tr>
                </thead>
                <tbody>
                {
                        announceForMe && announceForMe.length > 0 ?
                            announceForMe.map((item: AnnounceType) => (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.message}</td>
                                </tr>
                            )) :
                            <tr><td colSpan={2}>Không có thông báo nào.</td></tr>
                    }
                </tbody>
            </table>
            {loadingContext?.status ? <Loader /> : ''}
        </div>
    )
}