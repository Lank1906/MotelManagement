import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../libs/data_handling_context";

interface menuProps{
  widthE?:string;
}

export default function Menu(props:menuProps) {
  const dataContext=useContext(DataContext)
  return (
    <ul className="menu" style={{width:props.widthE}}>
      <li className="btn" onClick={()=>dataContext?.setData(-1,'dashboard')}><Link to="dashboard">Trang Chủ</Link></li>
      <li className='btn' onClick={()=>dataContext?.setData(-1,'type')}><Link to="type">Loại Phòng</Link></li>
      <li className="btn" onClick={()=>dataContext?.setData(-1,'room')}><Link to="room">Danh sách phòng</Link></li>
      <li className="btn" onClick={()=>dataContext?.setData(-1,'renter')}><Link to="renter">Danh sách người thuê</Link></li>
      <li className="btn" >Tính tiền</li>
    </ul>
  );
}
