interface menuProps{
  widthE?:string;
}

export default function Menu(props:menuProps) {
  return (
    <ul className="menu" style={{width:props.widthE}}>
      <li className="btn">Trang Chủ</li>
      <li className="btn">Danh sách phòng</li>
      <li className="btn">Danh sách người thuê</li>
      <li className="btn">Tính tiền</li>
    </ul>
  );
}
