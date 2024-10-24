import { useContext, useEffect, useState } from "react"
import { GetFetch } from "../../../libs/fetch"
import ServiceType from "../../../interface/service_type"
import { MyContext } from "../../../libs/context"
import RoomServiceType from "../../../interface/room_service_type"

export default function RoomService() {
    const [list, setList] = useState<ServiceType[] | undefined>(undefined)
    const [list2, setList2] = useState<RoomServiceType[] | undefined>(undefined);
    const context = useContext(MyContext)

    useEffect(() => {
        GetFetch('service', (data: ServiceType[]) => setList(data), context?.data)
    }, [])

    useEffect(() => {
        GetFetch('room-service/', (data: RoomServiceType[]) => setList2(data), context?.data)
    }, [])

    function handleAdd() {

    }

    return (
        <>
            <ul id="list-service">
                {list2 ? list2.map(item => <li key={item.id}>{item.name + ' x ' + item.times}</li>) : 'dang tai'}
            </ul>
            <div className="service-action">
                <select name="" id="">
                    {list ? list.map(
                        (item: ServiceType) => <option value={item.id} key={item.id}>{item.name + ' => ' + item.price + ' / ' + (item.follow ? 'thang' : 'lan')}</option>) : 'Dang tai'}
                </select>
                <button className="btn" onClick={handleAdd}>Thêm Mới</button>
            </div>
        </>
    )
}