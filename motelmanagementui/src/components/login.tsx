import { useContext, useState } from "react"
import { PostFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";

export default function Login(){
    const context=useContext(MyContext)
    const [name,setName]=useState('');
    const [pass,setPass]=useState('');
    function HandleLogin(){
        PostFetch('login',{"username":name,"password":pass},(data:any)=>{
            alert(data.message);
            context?.setData(data.token)
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