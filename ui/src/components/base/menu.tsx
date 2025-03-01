import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../libs/data_handling_context";

interface menuProps{
  widthE?:string;
}

export default function Menu(props:menuProps) {
  const dataContext=useContext(DataContext)
  return (
    <ul className="menu" style={{width:props.widthE}}>
      <li className={dataContext?.type=='dashboard'?'btn active':'btn'} onClick={()=>dataContext?.setData(-1,'dashboard')}><i className="fa-solid fa-house"></i><Link to="dashboard">Trang Chủ</Link></li>
      <li className={dataContext?.type=='type'?'btn active':'btn'} onClick={()=>dataContext?.setData(-1,'type')}><i className="fa-solid fa-square-h"></i><Link to="type">Loại Phòng</Link></li>
      <li className={dataContext?.type=='service'?'btn active':'btn'} onClick={()=>dataContext?.setData(-1,'service')}><i className="fa-brands fa-servicestack"></i> <Link to="service">Dịch vụ</Link></li>
      <li className={dataContext?.type=='room'?'btn active':'btn'} onClick={()=>dataContext?.setData(-1,'room')}><i className="fa-solid fa-list-check"></i><Link to="room">Danh sách phòng</Link></li>
      <li className={dataContext?.type=='renter'?'btn active':'btn'} onClick={()=>dataContext?.setData(-1,'renter')}><i className="fa-solid fa-person"></i><Link to="renter">Danh sách người thuê</Link></li>
      {/* <li className="btn" >Tính tiền</li> */}
    </ul>
  );
}
