import { useContext, useEffect, useState } from "react";
import { AnnounceContext } from "../libs/announce_context";

export default function Announce() {
    const [right, setRight] = useState(-200);
    const announceContext=useContext(AnnounceContext)
    useEffect(() => {
        setRight(10);
        const timer = setTimeout(() => {
            setRight(-200);
            const closeTimer = setTimeout(() => {
                announceContext?.setClose(false);
            }, 1000);
            return () => clearTimeout(closeTimer);
        }, 3000); // Thời gian 3 giây (3000ms)
        return () => clearTimeout(timer); 
    }, []);
    return (
        <div id="announce" className={announceContext?.type} style={{right:right+"px"}}>
            {announceContext?.message}
        </div>
    );
}