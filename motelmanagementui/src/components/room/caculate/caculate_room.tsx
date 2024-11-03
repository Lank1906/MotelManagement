import { useContext, useEffect, useState } from "react"
import { RoomDetailType } from "../../../interface/room_detail_type"
import { TypeType } from "../../../interface/type_type"
import RoomServiceType from "../../../interface/room_service_type"
import { MyContext } from "../../../libs/context"
import { DataContext } from "../../../libs/data_handling_context"
import { AnnounceContext } from "../../../libs/announce_context"
import { GetFetch } from "../../../libs/fetch"

export default function RoomCaculate() {
    const [room, setRoom] = useState<RoomDetailType | undefined>(undefined)
    const [type, setType] = useState<TypeType | undefined>(undefined)
    const [roomService, setRoomService] = useState<RoomServiceType[] | undefined>(undefined)
    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)

    useEffect(() => {
        GetFetch('room/' + dataContext?.id,
            (data: any) => {
                setRoom(data)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
        GetFetch('type/' + room?.type,
            (data: any) => {
                setType(data)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
        GetFetch('room-service/' + dataContext?.id,
            (data: any) => {
                setRoomService(data)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [])

    return (
        <>
            <table id="list-service">
                <thead>
                    <tr>
                        <th>Ten</th>
                        <th>Gia Thanh</th>
                        <th>Hanh dong</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <div className="service-action">
                <label htmlFor="name">So dien: </label><br />
                <input type="number" name="name" value={0} style={{ width: "40%" }} />
                <div className="btn">Cap nhat</div>
            </div>
            <div className="service-action">
                <div className="btn">Xác nhận đã thanh toán</div>
            </div>
        </>
    )
}