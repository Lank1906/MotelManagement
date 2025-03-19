import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../../libs/context"
import { DataContext } from "../../../libs/data_handling_context"
import { AnnounceContext } from "../../../libs/announce_context"
import { GetFetch, PostFetch, PutFetch } from "../../../libs/fetch"
import BillType from "../../../interface/bill_type"
import BillDetailType from "../../../interface/bill_details_type"
import { LoadingContext } from "../../../libs/loading_context"
import Loader from "../../base/loader"

export default function RoomCaculate() {
    const [object, setObject] = useState<BillType>()
    const [electric, setEletric] = useState<number>(0)
    const [water, setWater] = useState<number>(0)
    const [type,setType]=useState<number>(0)

    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const loadingContext=useContext(LoadingContext)

    useEffect(() => {
        if(dataContext?.id==-1)
            return
        GetFetch('calculate/' + dataContext?.id,
            (data: BillType) => {
                setObject(data)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            })
    },[dataContext?.id])

    function calculate(typez:number) {
        if(water<0||electric<=0||typez <0||typez>2||dataContext?.id==-1)
            return
        loadingContext?.setStatus(true)
        setType(typez)
        PostFetch("calculate/" + dataContext?.id,
            {
                water_number: water,
                electric_number: electric,
                type: typez
            }, (data: BillType) => {
                setObject(data)
            }, context?.data, (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }

    function payed(){
        if(water<0||electric<=0||type <0||type>2||dataContext?.id==-1)
            return
        loadingContext?.setStatus(true)
        PutFetch("calculate/" + dataContext?.id,
            {
                water_number: water,
                electric_number: electric,
                type: type
            }, (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }, context?.data, (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }

    return (
        <>
            <table id="list-service">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Giá thành</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {object?.data ? object.data.map((item: BillDetailType) => <tr key={item.category}><td>{item.category}</td><td>{item.price}x{item.times}</td><td>{item.sum}</td></tr>) : "Loading"}
                </tbody>
            </table>
            <div className="service-action">
                <div className="block">
                    <label htmlFor="name">Số điện: </label><br />
                    <input type="number" className="input" name="name" value={electric} onChange={(e) => setEletric(parseInt(e.target.value))} />
                </div>
                <div className="block">
                    <label htmlFor="name">Số nước: </label><br />
                    <input type="number" className="input" name="name" value={water} onChange={(e) => setWater(parseInt(e.target.value))} readOnly={object?.water_follow ? true : false} />
                </div>
            </div>
            <div className="service-action">
                <div className="btn delete" onClick={()=>calculate(2)}><i className="fa-solid fa-arrow-right-from-bracket"></i> Chuyển đi</div>
                <div className="btn add" onClick={()=>calculate(1)}><i className="fa-solid fa-rotate"></i> Thanh toán</div>
                <div className="btn update" onClick={()=>calculate(0)}><i className="fa-solid fa-arrow-left"></i> Chuyển đến</div>
            </div>
            <div className="service-action">
                <div className="btn add" onClick={payed}><i className="fa-solid fa-money-bill"></i> Xác nhận thanh toán</div>
            </div>
            {loadingContext?.status?<Loader/>:''}
        </>
    )
}