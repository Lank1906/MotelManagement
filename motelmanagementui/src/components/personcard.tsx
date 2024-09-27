import { useContext } from "react";
import { PersonType } from "../interface/person_type";
import { MyContext } from "../libs/context";
import { DataContext } from "../libs/data_handling_context";
import { AnnounceContext } from "../libs/announce_context";
import { ToastifyContext } from "../libs/toastify_context";
import { RoomType } from "../interface/room_type";
import { DeleteFetch } from "../libs/fetch";

export default function PersonCard(props:PersonType) {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const announceContext=useContext(AnnounceContext)
  const toastifyContext=useContext(ToastifyContext);

  async function HandleDelete(){
    const result=await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa "+props.renter_name +" khong ?")
    if(!result) return
    DeleteFetch('renter/' + props.id, (data: any) => {
      let tam = (dataContext?.list as (RoomType | PersonType)[]).filter(
        (item: RoomType | PersonType) =>
          item.id !== props.id
      )

      dataContext?.setList(
        tam as PersonType[]
      )
      announceContext?.setMessage(data.message)
      announceContext?.setType("success")
      announceContext?.setClose(true)
    }, context?.data)
  }
    return (
      <div className="card">
        <img src="/images/person.png" alt="person-demo" />
        <p>{props.renter_name}</p>
        <p>{props.room_name}</p>
        <p>{props.trang_thai}</p>
        <div className="btn" onClick={HandleDelete}>chuyen di</div>
      </div>
    );
  }
  