import { useContext, useEffect, useState } from "react"
import { DeleteFetch, GetFetch, PostFetch } from "../../../libs/fetch"
import ServiceType from "../../../interface/service_type"
import { MyContext } from "../../../libs/context"
import RoomServiceType from "../../../interface/room_service_type"
import { DataContext } from "../../../libs/data_handling_context"
import { AnnounceContext } from "../../../libs/announce_context"
import { ToastifyContext } from "../../../libs/toastify_context"
import { LoadingContext } from "../../../libs/loading_context"
import Loader from "../../base/loader"
import { YMDtoDMY } from "../../../libs/libs"

export default function RoomService() {
    const [list, setList] = useState<ServiceType[] | undefined>(undefined)
    const [list2, setList2] = useState<RoomServiceType[] | undefined>([]);
    const [object, setObject] = useState<RoomServiceType | undefined>(undefined);
    const [filter, setFilter] = useState<Date | undefined>(undefined)

    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const toastifyContext = useContext(ToastifyContext)
    const loadingContext = useContext(LoadingContext)

    let timeout: ReturnType<typeof setTimeout> | null = null;

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
        loadingContext?.setStatus(true)
        GetFetch('room-service/'+ (filter!==undefined ? `${filter.getFullYear()}-${filter.getMonth() + 1}-${filter.getDate()}/`:'') + dataContext?.id,
            (data: RoomServiceType[]) => {
                setList2(data)
                loadingContext?.setStatus(false)
            },
            context?.data,
            (data: any) => {
                setList2([])
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }, [dataContext?.id])

    async function handleAdd() {
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn thêm dịch vụ này không ?")
        if (!result)
            return
        loadingContext?.setStatus(true)
        const newObject: RoomServiceType = {
            id: object?.id as number,
            room_id: object?.room_id as number,
            service_id: object?.service_id as number,
            day: new Date().toLocaleDateString('en-CA'),
            times: object?.times ? object.times + 1 : 1
        };
        console.log(newObject)
        PostFetch('room-service/' + dataContext?.id,
            newObject,
            (data: any) => {
                let x = list2?.find(item => item.id === data.id)
                newObject.id = data.id
                newObject.name = object?.name
                if (x === undefined) {
                    setList2([...list2 as RoomServiceType[], newObject])
                }
                else {
                    let tam = [...list2 as RoomServiceType[]].map((item: any) => {
                        if (item.id === data.id) {
                            item = { ...item, times: ++item.times };
                        }
                        return item;
                    });
                    setList2(tam);
                }

                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }, context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }

    async function handleDelete(id: number) {
        const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa dịch vụ này không ?")
        if (!result || !id)
            return
        loadingContext?.setStatus(true)
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

    async function filterChange(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            const target = e.target as HTMLInputElement;
            const date = new Date(target.value);
            setFilter(date);
        } catch {
            return;
        }

        if(timeout){
            clearTimeout(timeout)
        }
        timeout=setTimeout(()=>{
            if (dataContext?.id === -1 || !filter)
                return
            loadingContext?.setStatus(true)
            GetFetch('room-service/'+`${filter.getFullYear()}-${filter.getMonth() + 1}-${filter.getDate()}`+'/' + dataContext?.id,
                (data: RoomServiceType[]) => {
                    setList2(data)
                    loadingContext?.setStatus(false)
                },
                context?.data,
                (data: any) => {
                    setList2([])
                    announceContext?.setMessage(data.message)
                    announceContext?.setType("danger")
                    announceContext?.setClose(true)
                    loadingContext?.setStatus(false)
                }
            )
        },3000)
    }

    async function filterRefresh(){
        setFilter(undefined)
        loadingContext?.setStatus(true)
        GetFetch('room-service/' + dataContext?.id,
            (data: RoomServiceType[]) => {
                setList2(data)
                loadingContext?.setStatus(false)
            },
            context?.data,
            (data: any) => {
                setList2([])
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }

    return (
        <>
            <div className="component">
                <label htmlFor="filter">Lọc theo tháng:</label><br />
                <input type="date" className="input" name="filter" value={filter?filter.toISOString().split('T')[0]:''} onChange={(e)=>filterChange(e)} />
                <div className="btn" onClick={filterRefresh}><i className="fa-solid fa-arrows-rotate"></i></div>
            </div>

            <table id="list-service">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Ngày</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {list2 ? list2.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.times}</td>
                            <td>{YMDtoDMY(item.day?.toString())}</td>
                            <td className="btn delete" onClick={() => handleDelete(item.id || -1)}><i className="fa-solid fa-trash"></i> </td>
                        </tr>) : <Loader/>}
                </tbody>
            </table>

            <div className="service-action" style={{display:filter?'none':'block'}}>
                <select className="input" value={object?.service_id || (list && list[0]?.id)} onChange={(e) => setObject({ ...object, room_id: dataContext?.id, service_id: parseInt(e.target.value), name: e.target.options[e.target.selectedIndex].text.split(' =>')[0] })}>
                    {list ? list.map(
                        (item: ServiceType) => <option value={item?.id} key={item.id}>{item.name + ' => ' + item.price + ' / ' + (item.follow ? 'Lần' : 'Tháng')}</option>
                    ) : <Loader />}
                </select>
                <button className="btn add" onClick={handleAdd}><i className="fa-solid fa-plus"></i> Thêm Mới</button>
            </div>
            {loadingContext?.status ? <Loader /> : ''}
        </>
    )
}