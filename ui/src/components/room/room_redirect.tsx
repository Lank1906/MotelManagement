import { useState } from "react"
import RoomInfo from "./info/room_info"
import RoomService from "./service/service_room"
import RoomCaculate from "./caculate/caculate_room"

export default function RoomRedirect() {
    const [target, setTarget] = useState<number>(0)
    return (
        <div className="room-redirect">
            <div className="room-nav">
                <div className={target == 0 ? 'active-nav' : ''} onClick={() => setTarget(0)}>Thông tin</div>
                <div className={target == 1 ? 'active-nav' : ''} onClick={() => setTarget(1)}>Dịch vụ</div>
                <div className={target == 2 ? 'active-nav' : ''} onClick={() => setTarget(2)}>Tính tiền</div>
            </div>
            <div className="room-content">
                {
                    target == 0 ? <RoomInfo /> :
                    target == 1 ? <RoomService /> :
                    target == 2 ? <RoomCaculate /> : <RoomInfo />
                }
            </div>
        </div>
    )
}