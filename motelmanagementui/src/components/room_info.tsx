import { useContext, useEffect, useState } from "react";
import { RoomDetailType } from "../interface/room_detail_type";
import { TypeType } from "../interface/type_type";
import { GetFetch, PostFetch, PostImage, PutFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { DataContext } from "../libs/data_handling_context";
import { RoomType } from "../interface/room_type";
import { AnnounceContext } from "../libs/announce_context";
import { ToastifyContext } from "../libs/toastify_context";
import { uploadImage } from "../libs/libs";

export default function RoomInfo() {
    const [image, setImage] = useState<string | null>(null)
    const [object, setObject] = useState<RoomDetailType | undefined>(undefined)
    const [types, setTypes] = useState<TypeType[]>([]);

    const dataContext = useContext(DataContext)
    const context = useContext(MyContext)
    const announceContext=useContext(AnnounceContext)
    const toastifyContext=useContext(ToastifyContext)

    useEffect(() => {
        if (dataContext?.id != -1) {
            GetFetch(dataContext?.type + '/' + dataContext?.id, (data: RoomDetailType[]) => {
                setObject(data[0])
            }, context?.data)
        }
    }, [dataContext?.id])

    useEffect(() => {
        GetFetch('type/short', (data: TypeType[]) => {
            setTypes(data)
        }, context?.data)
    }, [])

    async function handleAdd() {
        let object2 = { ...object }
        delete object2.person_limit;
        delete object2.electric_number;
        delete object2.type;

        const newObject: RoomType = {
            id: object2.id as number,
            name: object2.name as string,
            type_name: object2.type_name as string,
            check_in: object2.check_in as string,
            img_room: object2.img_room as string
        };

        PostFetch('room', object, (data: any) => {
            dataContext?.setList([...dataContext.list as RoomType[], newObject]);
            announceContext?.setMessage(data.message)
            announceContext?.setType("success")
            announceContext?.setClose(true)
        }, context?.data);
    }

    async function handleUpdate() {
        const result=await toastifyContext?.confirmResult("Bạn có chắc chắn muốn sửa phòng "+object?.name)
        if(!result)
            return
        PutFetch('room/' + object?.id, object, (data: any) => {
            let tam = [...dataContext?.list as RoomType[]].map((item: any) => {
                if (item.id == object?.id) {
                    item = object;
                }
                return item;
            });
            dataContext?.setList(tam);
            announceContext?.setMessage(data.message)
            announceContext?.setType("success")
            announceContext?.setClose(true)
        }, context?.data)
    }

    // async function handleDelete() {
    //     DeleteFetch('room/' + object?.id, (data: any) => {
    //         let tam = (dataContext?.list as (RoomType | PersonType)[]).filter(
    //             (item: RoomType | PersonType) =>
    //                 item.id !== object?.id
    //         )

    //         dataContext?.setList(
    //             tam as RoomType[]
    //         )
    //         announceContext?.setMessage(data.message)
    //         announceContext?.setType("success")
    //         announceContext?.setClose(true)
    //     }, context?.data)
    // }

    return (
        <div className="form">
            <div className="input">
                <label htmlFor="name">Tên Phòng</label><br />
                <input type="text" name="name" value={object?.name || ''} onChange={(e) => setObject({ ...object, name: e.target.value })} />
            </div>
            <div className="input">
                <label htmlFor="type">Loại Phòng</label><br />
                <select value={object?.type || 0} onChange={(e) => setObject({ ...object, type_name: e.target.options[e.target.selectedIndex].text, type: parseInt(e.target.value) })}>
                    {
                        types ? types.map((item: TypeType) => {
                            return (<option value={item.id} key={item.id}>{item.type_name}</option>)
                        }) : ''
                    }
                </select>
            </div>
            <div className="input">
                <label htmlFor="in">Ngày đến</label><br />
                <input type="date" name="in"
                    value={object?.check_in}
                    onChange={(e) => {
                        setObject({ ...object, check_in: e.target.value || undefined })
                    }} />
            </div>
            <div className="input">
                <label htmlFor="limit">Số người giới hạn</label><br />
                <input type="number" name="limit" value={object?.person_limit} onChange={(e) => setObject({ ...object, person_limit: parseInt(e.target.value) })} />
            </div>
            <div className="input">
                <label htmlFor="electric">Số điện</label><br />
                <input type="number" name="electric" className="input" value={object?.electric_number} onChange={(e) => setObject({ ...object, electric_number: parseInt(e.target.value) })} />
            </div>
            <div className="input">
                <label htmlFor="electric">Hình ảnh</label><br />
                <div id="preview">
                    {image && <img src={image} alt="Preview" style={{ width: "100%", height: "auto" }} />}
                </div>
                <input type="file" name="file" id="fileinput" className="input" onChange={async (e) => {
                    const { files } = e.target;
                    if (files && files.length > 0) {
                        const file = files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);

                        let t = await uploadImage(e.target);
                        setObject({ ...object, "img_room": t })
                    }
                }} />
            </div>
            <div className="action">
                <button className="btn" onClick={handleAdd}>Thêm Mới</button>
                <button className="btn" onClick={handleUpdate}>Sửa đổi</button>
            </div>
        </div>
    )
}