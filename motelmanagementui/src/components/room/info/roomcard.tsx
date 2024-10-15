import { useContext } from "react";
import { RoomType } from "../../../interface/room_type";
import { DeleteFetch } from "../../../libs/fetch";
import { DataContext } from "../../../libs/data_handling_context";
import { PersonType } from "../../../interface/person_type";
import { AnnounceContext } from "../../../libs/announce_context";
import { MyContext } from "../../../libs/context";
import { ToastifyContext } from "../../../libs/toastify_context";

export default function RoomCard(props: RoomType) {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const announceContext=useContext(AnnounceContext)
  const toastifyContext=useContext(ToastifyContext);
  
  async function handleDelete() {
    const result=await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa phòng "+props.name)
    if(!result) return
    DeleteFetch('room/' + props.id, (data: any) => {
      let tam = (dataContext?.list as (RoomType | PersonType)[]).filter(
        (item: RoomType | PersonType) =>
          item.id !== props.id
      )

      dataContext?.setList(
        tam as RoomType[]
      )
      announceContext?.setMessage(data.message)
      announceContext?.setType("success")
      announceContext?.setClose(true)
    }, context?.data)
  }

  return (
    <div className="card">
      <img src={"/images/home.png"} alt="home-demo" />
      <p>{props.name}</p>
      <p>{props.type_name}</p>
      <p>{props.check_in}</p>
      <div className="btn"> Tinh tien</div>
      <div className="btn" onClick={handleDelete}> Xoa</div>
    </div>
  );
}
