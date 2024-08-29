import { Link } from "react-router-dom";

interface menuProps{
  widthE?:string;
}

export default function Menu(props:menuProps) {
  return (
    <ul className="menu" style={{width:props.widthE}}>
      <li className="btn"><Link to="dashboard">Trang Chủ</Link></li>
      <li className="btn"><Link to="room">Danh sách phòng</Link></li>
      <li className="btn"><Link to="renter">Danh sách người thuê</Link></li>
      <li className="btn">Tính tiền</li>
    </ul>
  );
}
