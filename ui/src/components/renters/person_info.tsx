import { useContext, useEffect, useState } from "react";
import { AnnounceContext } from "../../libs/announce_context";
import { MyContext } from "../../libs/context";
import { uploadImage } from "../../libs/libs";
import { PersonDetailType } from "../../interface/person_detail_type";
import { DataContext } from "../../libs/data_handling_context";
import { GetFetch, PostFetch, PutFetch } from "../../libs/fetch";
import { RoomType } from "../../interface/room_type";
import { PersonType } from "../../interface/person_type";

export default function PersonInfo() {
    const announceContext = useContext(AnnounceContext)
    const dataContext = useContext(DataContext)
    const context = useContext(MyContext)

    const [cccdF, setCCCDF] = useState<string | null>(null)
    const [cccdB, setCCCDB] = useState<string | null>(null)
    const [object, setObject] = useState<PersonDetailType | undefined>(undefined);
    const [rooms, setRooms] = useState<RoomType[]>([])

    useEffect(() => {
        if (dataContext?.id == -1)
            return
        GetFetch(dataContext?.type + '/' + dataContext?.id,
            (data: PersonDetailType[]) => {
                setObject(data[0])
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [dataContext?.id])

    useEffect(() => {
        GetFetch('room/short',
            (data: RoomType[]) => {
                setRooms(data)
                setObject({ ...object, room_id: data[0].id, room_name: data[0].name })
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            })
    }, [])

    function handleAdd() {
        let object2 = { ...object }

        delete object2.room_name;

        //console.log(object2)

        let newObject: PersonType = {
            id: object2.id as number,
            renter_name: object2.renter_name as string,
            room_name: object?.room_name as string,
            trang_thai: object?.trang_thai as boolean,
        }

        PostFetch('renter',
            object2,
            (data: any) => {
                dataContext?.setList([...dataContext.list as PersonType[], {...newObject,id:data.id}]);
                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            });
    }

    function handleUpdate() {
        PutFetch('renter/' + object?.id,
            object,
            (data: any) => {
                let tam = [...dataContext?.list as PersonType[]].map((item: any) => {
                    if (item.id == object?.id) {
                        item = object;
                    }
                    return item;
                });
                dataContext?.setList(tam);
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
        <div className="form">
            <div className="input">
                <label htmlFor="name">Họ Tên</label><br />
                <input type="text" name="name" value={object?.renter_name || ''} onChange={(e) => setObject({ ...object, renter_name: e.target.value })} />
            </div>
            <div className="input">
                <label htmlFor="room_id">Phòng</label><br />
                <select name="room_id" value={object?.room_id} onChange={(e) => setObject({ ...object, room_id: parseInt(e.target.value), room_name: e.target.options[e.target.selectedIndex].text })}>
                    {
                        rooms ? rooms.map((item: RoomType) => {
                            return (<option key={item.id} value={item.id}>{item.name}</option>)
                        }) : ''
                    }
                </select>
            </div>
            <div className="input">
                <label htmlFor="cccd">CCCD</label><br />
                <input type="text" name="cccd" value={object?.cccd} onChange={(e) => setObject({ ...object, cccd: e.target.value })} />
            </div>
            <div className="input">
                <label htmlFor="que_quan">Que</label><br />
                <input type="text" name="que_quan" value={object?.que_quan} onChange={(e) => setObject({ ...object, que_quan: e.target.value })} />
            </div>
            <div className="input">
                <label htmlFor="sdt">SDT</label><br />
                <input type="text" name="sdt" value={object?.sdt} onChange={(e) => setObject({ ...object, sdt: e.target.value })} />
            </div>
            <div className="input">
                <label htmlFor="tctv">TCTV</label><br />
                <input type="radio" name="name" checked={object?.tctv} onChange={(e) => setObject({ ...object, tctv: e.target.checked })} />
            </div>
            <div className="input">
                <label htmlFor="trang_thai">Trang thai {object?.trang_thai ? 'Khach' : 'Nguoi Thue'}</label><br />
                <input type="radio" name="trang_thai" checked={object?.trang_thai} onChange={(e) => setObject({ ...object, trang_thai: e.target.checked })} />
            </div>
            <div className="input">
                <label htmlFor="electric">Hình ảnh</label><br />
                <div id="preview">
                    {cccdF && <img src={cccdF} alt="Preview" style={{ width: "100%", height: "auto" }} />}
                </div>
                <input type="file" name="file" id="fileinput" className="input" onChange={async (e) => {
                    const { files } = e.target;
                    if (files && files.length > 0) {
                        const file = files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setCCCDF(reader.result as string);
                        };
                        reader.readAsDataURL(file);

                        let t = await uploadImage(e.target, announceContext, context);
                        setObject({ ...object, img_font: t })
                    }
                }} />
            </div>
            <div className="input">
                <label htmlFor="electric">Hình ảnh</label><br />
                <div id="preview">
                    {cccdB && <img src={cccdB} alt="Preview" style={{ width: "100%", height: "auto" }} />}
                </div>
                <input type="file" name="file" id="fileinput" className="input" onChange={async (e) => {
                    const { files } = e.target;
                    if (files && files.length > 0) {
                        const file = files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setCCCDB(reader.result as string);
                        };
                        reader.readAsDataURL(file);

                        let t = await uploadImage(e.target, announceContext, context);
                        setObject({ ...object, img_back: t })
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