import { useContext, useEffect, useState } from "react";
import { DataContext } from "../libs/data_handling_context";
import { GetFetch } from "../libs/fetch";
import { MyContext } from "../libs/context";
import { RoomDetailType } from "../interface/room_detail_type";

interface infoProps {
  widthE: string,
}

export default function Info(props: infoProps) {
  const context = useContext(MyContext)
  const dataContext = useContext(DataContext)
  const [object, setObject] = useState<RoomDetailType | undefined>(undefined)

  useEffect(() => {
    if (dataContext?.id != undefined) {
      GetFetch(dataContext?.type + '/' + dataContext?.id, (data: RoomDetailType) => {
        setObject(data)
      }, context?.data)
    }
  }, [dataContext?.id])
  return (
    <div className="info" style={{ width: props.widthE }}>
      <div className="info-content">
        <h2>Thông tin chi tiết</h2>
        {dataContext?.type == 'room' ? (
          <div className="form">
            <div className="input">
              <label htmlFor="name">Tên Phòng</label><br />
              <input type="text" name="name" />
            </div>
            <div className="input">
              <label htmlFor="type">Loại Phòng</label><br />
              <select>
                <option value="Ford">Ford</option>
                <option value="Volvo" selected>Volvo</option>
                <option value="Fiat">Fiat</option>
              </select>
            </div>
            <div className="input">
              <label htmlFor="in">Ngày đến</label><br />
              <input type="date" name="in" />
            </div>
            <div className="input">
              <label htmlFor="limit">Số người giới hạn</label><br />
              <input type="number" name="limit" />
            </div>
            <div className="input">
              <label htmlFor="electric">Số điện</label><br />
              <input type="text" name="electric" className="input" />
            </div>
            <div className="input">
              <label htmlFor="electric">Hình ảnh</label><br />
              <input type="file" name="electric" className="input" />
            </div>
            <div className="action">
              <button className="btn">Thêm Mới</button>
              <button className="btn">Sửa đổi</button>
            </div>
          </div>
        ) : 'persontype'}
      </div>
    </div>
  );
}
