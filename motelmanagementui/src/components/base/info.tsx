import { useContext } from "react";
import { DataContext } from "../../libs/data_handling_context";
import RoomInfo from "../room/info/room_info";
import PersonInfo from "../renters/person_info";
import TypeInfo from "../type/type_info";

interface infoProps {
  widthE: string,
}

export default function Info(props: infoProps) {
  const dataContext = useContext(DataContext)

  return (
    <div className="info" style={{ width: props.widthE }}>
      <div className="info-content">
        <h2>Thông tin chi tiết</h2>
        { 
          dataContext?.type=='room' ? <RoomInfo/> :
          dataContext?.type=='renter' ? <PersonInfo/>:
          dataContext?.type=='dashboard' ? '':
          dataContext?.type=='type' ? <TypeInfo/> :<RoomInfo/>
        }
      </div>
    </div>
  );
}
