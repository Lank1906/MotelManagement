import { useContext, useEffect, useState } from "react";
import { AnnounceContext } from "../../libs/announce_context";
import { MyContext } from "../../libs/context";
import { uploadImage } from "../../libs/libs";
import { PersonDetailType } from "../../interface/person_detail_type";
import { DataContext } from "../../libs/data_handling_context";
import { GetFetch, PostFetch, PutFetch } from "../../libs/fetch";
import { RoomType } from "../../interface/room_type";
import { PersonType } from "../../interface/person_type";
import { LoadingContext } from "../../libs/loading_context";
import Loader from "../base/loader";

export default function PersonInfo() {
    const announceContext = useContext(AnnounceContext)
    const dataContext = useContext(DataContext)
    const context = useContext(MyContext)
    const loadingContext=useContext(LoadingContext)

    const [cccdF, setCCCDF] = useState<string | null>(null)
    const [cccdB, setCCCDB] = useState<string | null>(null)
    const [object, setObject] = useState<PersonDetailType | undefined>(undefined);
    const [rooms, setRooms] = useState<RoomType[]>([])

    useEffect(() => {
        console.log(dataContext?.type)
        if (dataContext?.id == -1)
            return
        loadingContext?.setStatus(true)
        GetFetch(dataContext?.type + '/' + dataContext?.id,
            (data: PersonDetailType[]) => {
                setObject(data[0])
                loadingContext?.setStatus(false)
            },
            context?.data,
            (data: any) => {
                console.log(data.message)
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
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

    // function handleAdd() {
    //     loadingContext?.setStatus(true);
    //     let object2 = { ...object }

    //     delete object2.room_name;

    //     //console.log(object2)

    //     let newObject: PersonType = {
    //         id: object2.id as number,
    //         renter_name: object2.renter_name as string,
    //         room_name: object?.room_name as string,
    //         img_font:object?.img_font as string,
    //         trang_thai: object?.trang_thai as boolean,
    //     }

    //     PostFetch('renter',
    //         object2,
    //         (data: any) => {
    //             dataContext?.setList([...dataContext.list as PersonType[], {...newObject,id:data.id}]);
    //             announceContext?.setMessage(data.message)
    //             announceContext?.setType("success")
    //             announceContext?.setClose(true)
    //             loadingContext?.setStatus(false)
    //         },
    //         context?.data,
    //         (data: any) => {
    //             announceContext?.setMessage(data.message)
    //             announceContext?.setType("danger")
    //             announceContext?.setClose(true)
    //             loadingContext?.setStatus(false)
    //         });
    // }

    // function handleUpdate() {
    //     loadingContext?.setStatus(true)
    //     PutFetch('renter/' + object?.id,
    //         object,
    //         (data: any) => {
    //             let tam = [...dataContext?.list as PersonType[]].map((item: any) => {
    //                 if (item.id == object?.id) {
    //                     item = object;
    //                 }
    //                 return item;
    //             });
    //             dataContext?.setList(tam);
    //             announceContext?.setMessage(data.message)
    //             announceContext?.setType("success")
    //             announceContext?.setClose(true)
    //             loadingContext?.setStatus(false)
    //         },
    //         context?.data,
    //         (data: any) => {
    //             announceContext?.setMessage(data.message)
    //             announceContext?.setType("danger")
    //             announceContext?.setClose(true)
    //             loadingContext?.setStatus(false)
    //         })
    // }

    function requestInfo(){
        if (dataContext?.id == -1)
            return
        loadingContext?.setStatus(true)
        GetFetch(dataContext?.type + '/info/' + dataContext?.id,
            (data: PersonDetailType[]) => {
                setObject(data[0])
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
        <div className="form">
            <div className="component">
                <label htmlFor="name">Họ Tên</label><br />
                <input type="text" className="input" name="name" value={object?.renter_name || ''} onChange={(e) => setObject({ ...object, renter_name: e.target.value })} />
            </div>
            <div className="component">
                <label htmlFor="room_id">Phòng</label><br />
                <select className="input" name="room_id" value={object?.room_id} onChange={(e) => setObject({ ...object, room_id: parseInt(e.target.value), room_name: e.target.options[e.target.selectedIndex].text })}>
                    {
                        rooms ? rooms.map((item: RoomType) => {
                            return (<option key={item.id} value={item.id}>{item.name}</option>)
                        }) : ''
                    }
                </select>
            </div>
            <div className="component">
                <label htmlFor="cccd">CCCD</label><br />
                <input type="text" className="input" name="cccd" value={object?.cccd} onChange={(e) => setObject({ ...object, cccd: e.target.value })} />
            </div>
            <div className="component">
                <label htmlFor="que_quan">Quê quán</label><br />
                <input type="text" className="input" name="que_quan" value={object?.country} onChange={(e) => setObject({ ...object, country: e.target.value })} />
            </div>
            <div className="component">
                <label htmlFor="email">Email</label><br />
                <input type="text" name="email" value={object?.email} onChange={(e) => setObject({ ...object, email: e.target.value })} />
            </div>
            <div className="component">
                <label htmlFor="sdt">SĐT</label><br />
                <input type="text" name="sdt" value={object?.phone} onChange={(e) => setObject({ ...object, phone: e.target.value })} />
            </div>
            <div className="block">
                <label htmlFor="tctv">TCTV</label><br />
                <input type="checkbox" name="name" checked={object?.tctv} onChange={(e) => setObject({ ...object, tctv: e.target.checked })} />
            </div>
            <div className="block">
                <label htmlFor="trang_thai">Trạng thái {object?.status ? 'Khách chơi' : 'Người thuê'}</label><br />
                <input type="checkbox" name="trang_thai" checked={object?.status} onChange={(e) => setObject({ ...object, status: e.target.checked })} />
            </div>
            <div className="component">
                <label htmlFor="filefront">Mặt trước CCCD</label><br />
                <div id="preview">
                    {cccdF && <img src={cccdF} alt="Preview" style={{ width: "100%", height: "auto" }} />}
                </div>
                <input type="file" className="input" name="filefront" id="fileinput" onChange={async (e) => {
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
            <div className="component">
                <label htmlFor="fileafter">Mặt sau CCCD</label><br />
                <div id="preview">
                    {cccdB && <img src={cccdB} alt="Preview" style={{ width: "100%", height: "auto" }} />}
                </div>
                <input type="file" className="input" name="fileafter" id="fileinput" onChange={async (e) => {
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
                <button className="btn add" onClick={requestInfo}><i className="fa-solid fa-plus"></i> Yêu cầu cập nhật thông tin</button>
            </div>
            {loadingContext?.status?<Loader/>:''}
        </div>
    )
}