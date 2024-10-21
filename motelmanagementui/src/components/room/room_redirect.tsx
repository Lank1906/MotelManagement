import { useState } from "react"

export default function RoomRedirect(){
    const [target,setTarget]=useState<number>(0)
    return (
        <div className="room-redirect">
            <div className="room-nav">
                <div className={target==0 ?'active':''} onClick={()=>setTarget(0)}>Thong tin</div>
                <div className={target==1 ?'active':''} onClick={()=>setTarget(1)}>Dich vu</div>
                <div className={target==2 ?'active':''} onClick={()=>setTarget(2)}>Tinh tien</div>
            </div>
            <div className="room-content">

            </div>
        </div>
    )
}