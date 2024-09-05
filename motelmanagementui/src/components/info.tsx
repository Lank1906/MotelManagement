import { useContext, useEffect, useState } from "react";
import { DataContext } from "../libs/data_handling_context";
import { GetFetch, PostFetch, PostImage } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { RoomDetailType } from "../interface/room_detail_type";
import { TypeType } from "../interface/type_type";

interface infoProps {
  widthE: string,
}

export default function Info(props: infoProps) {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const [image, setImage] = useState<string | null>(null)
  const [object, setObject] = useState<RoomDetailType | undefined>(undefined)
  const [types, setTypes] = useState<TypeType[]>([]);

  useEffect(() => {
    if (dataContext?.id != -1) {
      GetFetch(dataContext?.type + '/' + dataContext?.id, (data: RoomDetailType[]) => {
        setObject(data[0])
      }, context?.data)
    }
  }, [dataContext?.id])

  useEffect(() => {
    GetFetch('type', (data: TypeType[]) => {
      setTypes(data)
    }, context?.data)
  }, [])

  async function uploadImage(e: React.FormEvent) {
    e.preventDefault();
    const fileInput = document.querySelector('#fileinput') as HTMLInputElement;
    const formData = new FormData();

    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append('image', fileInput.files[0]); // Tên 'image' phải khớp với tên multer chờ nhận
      PostImage('api/upload', formData, (data) => alert(data), context?.data);
    }
    console.log(formData);
  }

  function handleAdd() {
    PostFetch('room', object, (data) => alert(data), context?.data);
  }

  return (
    <div className="info" style={{ width: props.widthE }}>
      <div className="info-content">
        <h2>Thông tin chi tiết</h2>
        {dataContext?.type == 'room' ? (
          <div className="form">
            <div className="input">
              <label htmlFor="name">Tên Phòng</label><br />
              <input type="text" name="name" value={object?.name || ''} onChange={(e) => setObject({ ...object, name: e.target.value })} />
            </div>
            <div className="input">
              <label htmlFor="type">Loại Phòng</label><br />
              <select value={object?.type_id || 0} onChange={(e) => setObject({ ...object, type_name: e.target.value })}>
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
                value={object?.check_in ? object.check_in.slice(0, 10) : ''}
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
                {image && <img src={image} alt="Preview" style={{ width: "auto", height: "auto" }} />}
              </div>
              <input type="file" name="file" id="fileinput" className="input" onChange={(e) => {
                const { files } = e.target;
                if (files && files.length > 0) {
                  const file = files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }} />
            </div>
            <div className="action">
              <button className="btn" onClick={uploadImage}>Thêm Mới</button>
              <button className="btn">Sửa đổi</button>
            </div>
          </div>
        ) : 'persontype'}
      </div>
    </div>
  );
}
