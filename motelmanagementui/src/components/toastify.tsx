import { useContext, useEffect, useState } from "react";
import { ToastifyContext } from "../libs/toastify_context";

export default function Toastify() {
    const [width,setWidth]=useState(0)
    const [height,setHeight]=useState(0)
    const toastifyContext=useContext(ToastifyContext)
    useEffect(()=>{
        setWidth(100)
        setHeight(100)
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
        <div className="overlay" style={{width:width+'vw',height:height+'vh'}}>
            <div id="toastify">
                <p>Message</p>
                <div>
                    <div className="btn" onClick={()=>returnResult(true)}>Ok</div>
                    <div className="btn" onClick={()=>returnResult(false)}>Huy</div>
                </div>
            </div>
        </div>
    )
}