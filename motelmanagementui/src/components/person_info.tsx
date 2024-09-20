import { useContext, useState } from "react";
import { AnnounceContext } from "../libs/announce_context";
import { MyContext } from "../libs/context";
import { uploadImage } from "../libs/libs";

export default function PersonInfo(){
    const announceContext=useContext(AnnounceContext)
    const context=useContext(MyContext)

    const [cccdF, setCCCDF] = useState<string | null>(null)
    const [cccdB, setCCCDB] = useState<string | null>(null)

    function handleAdd(){}
    function handleUpdate(){}
    function handleDelete(){}
    return(
        <div className="form">
            <div className="input">
                <label htmlFor="name"></label><br/>
                <input type="text" name="name"/>
            </div>
            <div className="input">
                <label htmlFor="room_id"></label><br/>
                <select name="room_id">
                    <option>room_name</option>
                </select>
            </div>
            <div className="input">
                <label htmlFor="cccd"></label><br/>
                <input type="text" name="cccd"/>
            </div>
            <div className="input">
                <label htmlFor="que_quan"></label><br/>
                <input type="text" name="que_quan"/>
            </div>
            <div className="input">
                <label htmlFor="sdt"></label><br/>
                <input type="text" name="sdt"/>
            </div>
            <div className="input">
                <label htmlFor="tctv"></label><br/>
                <input type="radio" name="name"/>
            </div>
            <div className="input">
                <label htmlFor="trang_thai"></label><br/>
                <input type="radio" name="trang_thai"/>
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

                        let t = await uploadImage(e.target);
                        //setObject({ ...object, "img_room": t })
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

                        let t = await uploadImage(e.target);
                        // setObject({ ...object, "img_room": t })
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