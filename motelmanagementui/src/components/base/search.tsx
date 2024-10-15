import { useContext, useEffect, useState } from "react";
import { GetFetch } from "../../libs/fetch";
import { MyContext } from "../../libs/context";
import { DataContext } from "../../libs/data_handling_context";

export default function Search() {
  const [key,setKey]=useState<string>("");
  const context=useContext(MyContext)
  const dataContext=useContext(DataContext)
  function se(){
    if(key=='')
      return
    GetFetch(dataContext?.type+'/?'+dataContext?.type+'s.name='+key,(data:any)=>{
      dataContext?.setList(data)
    },context?.data)
  }
  return (
    <div className="search">
        <input type="text" className="input" value={key} onChange={(e)=>setKey(e.target.value)}/>
        <div className="icon" onClick={se}><i className="fa-solid fa-magnifying-glass"></i></div>
    </div>
  );
}
