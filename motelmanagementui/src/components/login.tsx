import { useContext, useState } from "react"
import { PostFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";

type LoginProps = {
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setType: React.Dispatch<React.SetStateAction<string>>;
    close: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ setMessage, setType,close }:LoginProps){
    const context=useContext(MyContext)
    const [name,setName]=useState('');
    const [pass,setPass]=useState('');
    function HandleLogin(){
        PostFetch('login',{"username":name,"password":pass},(data:any)=>{
            context?.setData(data.token)
            setMessage("ok");
            setType("information");
            close(true);
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