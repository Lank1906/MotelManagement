import { PersonType } from "../interface/person_type";

export default function PersonCard(props:PersonType) {
    return (
      <div className="card">
        <img src="/images/person.png" alt="person-demo" />
        <p>{props.renter_name}</p>
        <p>{props.room_name}</p>
        <p>{props.old}</p>
        <p>{props.trang_thai}</p>
        <div className="btn">chuyen di</div>
      </div>
    );
  }
  