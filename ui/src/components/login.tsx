import { useContext, useEffect, useState } from "react"
import { PostFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { AnnounceContext } from "../libs/announce_context";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const context=useContext(MyContext)
    const navigate=useNavigate();
    const announceContext=useContext(AnnounceContext);
    const [name,setName]=useState('');
    const [pass,setPass]=useState('');
    function HandleLogin(){
        PostFetch('login',{"username":name,"password":pass},(data:any)=>{
            context?.setData(data.token)
            announceContext?.setMessage(data.message)
            announceContext?.setType("information")
            announceContext?.setClose(true)
            navigate('/home/room')
        },"",(data:any)=>{
            announceContext?.setMessage(data.message)
            announceContext?.setType("danger")
            announceContext?.setClose(true)
        });  
    }
    return (
        <div id="login">
            <div id="login-main">
                <h3>Đăng Nhập</h3>
                <input className="search" type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input className="search" type='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
                <button className="btn add" onClick={HandleLogin}><i className="fa-solid fa-arrow-right-to-bracket"></i> Đăng Nhập</button>
                <p>Bạn chưa có tài khoản rồi ? <a href="https://zaloapp.com/qr/p/nl01nsmzd8dc">Hãy đăng kí ngay</a>  </p>
            </div>
        </div>
    )
}