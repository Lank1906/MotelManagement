import { useContext } from "react";
import { PersonType } from "../../interface/person_type";
import { MyContext } from "../../libs/context";
import { DataContext } from "../../libs/data_handling_context";
import { AnnounceContext } from "../../libs/announce_context";
import { ToastifyContext } from "../../libs/toastify_context";
import { RoomType } from "../../interface/room_type";
import { DeleteFetch } from "../../libs/fetch";

export default function PersonCard(props: PersonType) {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const announceContext = useContext(AnnounceContext)
  const toastifyContext = useContext(ToastifyContext);

  const publicUrl="https://ho-ng-b-i-1.paiza-user-free.cloud:5000/uploads/";

  async function HandleDelete() {
    const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa " + props.renter_name + " khong ?")
    if (!result) return
    DeleteFetch('renter/' + props.id,
      (data: any) => {
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
      },
      context?.data,
      (data: any) => {
        announceContext?.setMessage(data.message)
        announceContext?.setType("danger")
        announceContext?.setClose(true)
      })
  }
  return (
    <div className="card">
      <img src={props.img_font? publicUrl+ props.img_font:"/images/person.png"} alt="person-demo" />
      <div className="mask-card">{props.room_name}</div>
      <p>{props.renter_name}</p>
      <p>{props.room_name}</p>
      <p>{props.trang_thai? "Đã đăng kí":"Chưa đăng kí"}</p>
      <p>tạm trú</p>
      <div className="btn" onClick={HandleDelete}>chuyen di</div>
    </div>
  );
}
