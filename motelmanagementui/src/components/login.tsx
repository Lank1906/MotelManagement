import { useContext, useState } from "react"
import { PostFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { AnnounceContext } from "../libs/announce_context";


export default function Login(){
    const context=useContext(MyContext)
    const announceContext=useContext(AnnounceContext);
    const [name,setName]=useState('');
    const [pass,setPass]=useState('');
    function HandleLogin(){
        PostFetch('login',{"username":name,"password":pass},(data:any)=>{
            context?.setData(data.token)
            announceContext?.setMessage("okok")
            announceContext?.setType("information")
            announceContext?.setClose(true)
        });
        
    }
    return (
        <div id="login">
            <div id="login-main">
                <h3>Đăng Nhập</h3>
                <input className="search" type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input className="search" type='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
                <button className="btn" onClick={HandleLogin}>Đăng Nhập</button>
                <p>Bạn chưa có tài khoản rồi ? Hãy đăng kí ngay </p>
            </div>
        </div>
    )
}