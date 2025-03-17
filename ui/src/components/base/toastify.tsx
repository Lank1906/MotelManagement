import { useContext, useEffect, useState } from "react";
import { ToastifyContext } from "../../libs/toastify_context";

export default function Toastify() {
    const [width,setWidth]=useState(0)
    const [height,setHeight]=useState(0)
    const toastifyContext=useContext(ToastifyContext)
    useEffect(()=>{
        setWidth(400)
        setHeight(250)
    },[])
    function returnResult(a:boolean){
        setWidth(0)
        setHeight(0)
        const timer=setTimeout(()=>{
            toastifyContext?.setClose(false)
        },1000)
        toastifyContext?.setResult(a)
        return () => clearTimeout(timer);
    }
    return (
        <div className="overlay">
            <div id="toastify" style={{width:width+"px",height:height+"px"}}>
                <p>{toastifyContext?.message}</p>
                <div>
                    <div className="btn delete" onClick={()=>returnResult(true)}> Ok</div>
                    <div className="btn add" onClick={()=>returnResult(false)}>Hủy</div>
                </div>
            </div>
        </div>
    )
}