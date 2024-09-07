import { RoomType } from "../interface/room_type";

export default function RoomCard(props:RoomType) {
    return (
      <div className="card">
        <img src={"/images/home.png"} alt="home-demo" />
        <p>{props.name}</p>
        <p>{props.type_name}</p>
        <p>{props.check_in.toString()}</p>
        <div className="btn"> Tinh tien</div>
        <div className="btn"> Xoa</div>
      </div>
    );
  }
  