import { useContext, useEffect, useState } from "react"
import { DeleteFetch, GetFetch, PostFetch } from "../../../libs/fetch"
import ServiceType from "../../../interface/service_type"
import { MyContext } from "../../../libs/context"
import RoomServiceType from "../../../interface/room_service_type"
import { DataContext } from "../../../libs/data_handling_context"
import { AnnounceContext } from "../../../libs/announce_context"
import { ToastifyContext } from "../../../libs/toastify_context"

export default function RoomService() {
    const [list, setList] = useState<ServiceType[] | undefined>(undefined)
    const [list2, setList2] = useState<RoomServiceType[] | undefined>([]);
    const [object, setObject] = useState<RoomServiceType | undefined>(undefined);

    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const toastifyContext = useContext(ToastifyContext)

    useEffect(() => {
        GetFetch('service',
            (data: ServiceType[]) => setList(data),
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [])

    useEffect(() => {
        if (dataContext?.id === -1)
            return
        GetFetch('room-service/' + dataContext?.id,
            (data: RoomServiceType[]) => setList2(data),
            context?.data,
            (data: any) => {
                setList2([])
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            }
        )
    }, [dataContext?.id])

    async function handleAdd() {
        const result = await toastifyContext?.confirmResult("Ban co chac muon them dich vu nay ko ?")
        if (!result)
            return
        const newObject: RoomServiceType = {
            id: object?.id as number,
            room_id: object?.room_id as number,
            service_id: object?.service_id as number,
            day: object?.day ? object.day + ',' + new Date().getDate() : new Date().getDate().toString(),
            times:object?.times ? object.times+1:1
        };
        PostFetch('room-service/' + dataContext?.id,
            newObject,
            (data: any) => {
                let x = list2?.find(item => item.id === data.id)
                newObject.id=data.id
                newObject.name=object?.name
                if (x === undefined){
                    setList2([...list2 as RoomServiceType[],newObject])
                }
                else{
                    let tam = [...list2 as RoomServiceType[]].map((item: any) => {
                        if (item.id === data.id) {
                            item = {...item,times:++item.times};
                        }
                        return item;
                    });
                    setList2(tam);
                }

                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
            }, context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            }
        )
    }

    async function handleDelete(id: number) {
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa dịch vụ này không ?")
        if (!result || !id)
            return
        DeleteFetch('room-service/' + id,
            (data: any) => {
                let tam = (list2 as RoomServiceType[]).filter(
                    (item: RoomServiceType) =>
                        item.id !== id
                )

                setList2(
                    tam as RoomServiceType[]
                )
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
        <>
            <table id="list-service">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {list2 ? list2.map(item => <tr key={item.id}><td>{item.name}</td><td>{item.times}</td><td className="btn" onClick={() => handleDelete(item.id || -1)}>Xoa</td></tr>) : 'dang tai'}
                </tbody>

            </table>
            <div className="service-action">
                <select className="input" value={object?.service_id || (list && list[0]?.id)} onChange={(e) => setObject({ ...object, room_id: dataContext?.id, service_id: parseInt(e.target.value),name:e.target.options[e.target.selectedIndex].text.split(' =>')[0]})}>
                    {list ? list.map(
                        (item: ServiceType) => <option value={item?.id} key={item.id}>{item.name + ' => ' + item.price + ' / ' + (item.follow ? 'Lần' : 'Tháng')}</option>
                    ) : 'Đang tải'}
                </select>
                <button className="btn add" onClick={handleAdd}><i className="fa-solid fa-plus"></i> Thêm Mới</button>
            </div>
        </>
    )
}