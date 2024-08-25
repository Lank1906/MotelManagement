import { useEffect, useState } from "react";

interface AnnounceProps {
    message: string;
    type?:string;
    close:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Announce({message,type,close}: AnnounceProps) {
    const [right, setRight] = useState(-200);
    useEffect(() => {
        setRight(10);
        const timer = setTimeout(() => {
            setRight(-200);
            const closeTimer = setTimeout(() => {
                close(false); // Đúng, cần truyền vào false để cập nhật state
            }, 1000); // Duration of the slide-out animation (1 second)

            // Clear the closeTimer if the component is unmounted before the timeout finishes
            return () => clearTimeout(closeTimer);
        }, 3000); // Thời gian 3 giây (3000ms)
        return () => clearTimeout(timer); 
    }, []);
    return (
        <div id="announce" className={type} style={{right:right+"px"}}>
            {message}
        </div>
    );
}