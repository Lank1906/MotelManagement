import { useContext } from "react";
import { RoomType } from "../../../interface/room_type";
import { DeleteFetch } from "../../../libs/fetch";
import { DataContext } from "../../../libs/data_handling_context";
import { PersonType } from "../../../interface/person_type";
import { AnnounceContext } from "../../../libs/announce_context";
import { MyContext } from "../../../libs/context";
import { ToastifyContext } from "../../../libs/toastify_context";
import { LoadingContext } from "../../../libs/loading_context";

export default function RoomCard(props: RoomType) {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const announceContext = useContext(AnnounceContext)
  const toastifyContext = useContext(ToastifyContext);
  const loadingContext=useContext(LoadingContext)

  const publicUrl="https://ho-ng-b-i-1.paiza-user-free.cloud:5000/uploads/";

  async function handleDelete() {
    const result = await toastifyContext?.confirmResult("Bạn có chắc chắn muốn xóa phòng " + props.name+" ?")
    if (!result) return
    loadingContext?.setStatus(true)
    DeleteFetch('room/' + props.id,
      (data: any) => {
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
        loadingContext?.setStatus(false)
      },
      context?.data,
      (data: any) => {
        announceContext?.setMessage(data.message)
        announceContext?.setType("danger")
        announceContext?.setClose(true)
        loadingContext?.setStatus(false)
      })
  }

  return (
    <div className="card">
      <img src={props.img_room? publicUrl+ props.img_room:"/images/home.png"} alt="home-demo" />
      <p>{props.name}</p>
      <p>{props.type_name}</p>
      <p>{props.check_in?props.check_in:"trong"}</p>
      <div className="btn delete" onClick={handleDelete}><i className="fa-solid fa-trash"></i></div>
    </div>
  );
}
