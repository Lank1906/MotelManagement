import { useContext } from "react";
import { DataContext } from "../../libs/data_handling_context";
import PersonInfo from "../renters/person_info";
import TypeInfo from "../type/type_info";
import ServiceInfo from "../service/service_info";
import RoomRedirect from "../room/room_redirect";

interface infoProps {
  widthE: string,
}

export default function Info(props: infoProps) {
  const dataContext = useContext(DataContext)

  return (
    <div className="info" style={{ width: props.widthE, display: dataContext?.type == 'dashboard' || dataContext?.type=='announce' ? 'none' : 'block' }}>
      <div className="info-content">
        <h2 style={{ marginBottom: '24px' }}>Thông tin chi tiết</h2>
        {
          dataContext?.type == 'room' ? <RoomRedirect /> :
            dataContext?.type == 'room-rent' ? <PersonInfo /> :
              dataContext?.type == 'dashboard' ? '' :
                dataContext?.type == 'announce' ? '' :
                  dataContext?.type == 'type' ? <TypeInfo /> :
                    dataContext?.type == 'service' ? <ServiceInfo /> : <RoomRedirect />
        }
      </div>
    </div>
  );
}
