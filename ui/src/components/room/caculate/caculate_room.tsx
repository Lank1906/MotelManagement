import { useContext, useEffect, useState } from "react"
import { MyContext } from "../../../libs/context"
import { DataContext } from "../../../libs/data_handling_context"
import { AnnounceContext } from "../../../libs/announce_context"
import { GetFetch, PostFetch, PutFetch } from "../../../libs/fetch"
import BillType from "../../../interface/bill_type"
import BillDetailType from "../../../interface/bill_details_type"

export default function RoomCaculate() {
    const [object, setObject] = useState<BillType>()
    const [electric, setEletric] = useState<number>(0)
    const [water, setWater] = useState<number>(0)
    const [type,setType]=useState<number>(0)

    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)

    useEffect(() => {
        console.log(dataContext?.id)
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
            })
    },[dataContext?.id])

    function calculate(typez:number) {
        if(water<0||electric<=0||typez <0||typez>2||dataContext?.id==-1)
            return
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
            }
        )
    }

    function payed(){
        if(water<0||electric<=0||type <0||type>2||dataContext?.id==-1)
            return
        PutFetch("calculate/" + dataContext?.id,
            {
                water_number: water,
                electric_number: electric,
                type: type
            }, (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("success")
                announceContext?.setClose(true)
            }, context?.data, (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
            }
        )
    }

    return (
        <>
            <table id="list-service">
                <thead>
                    <tr>
                        <th>Ten</th>
                        <th>Gia Thanh</th>
                        <th>Hanh dong</th>
                    </tr>
                </thead>
                <tbody>
                    {object?.data ? object.data.map((item: BillDetailType) => <tr key={item.category}><td>{item.category}</td><td>{item.price}x{item.times}</td><td>{item.sum}</td></tr>) : "Loading"}
                </tbody>
            </table>
            <div className="service-action">
                <div className="block">
                    <label htmlFor="name">So dien: </label><br />
                    <input type="number" name="name" value={electric} onChange={(e) => setEletric(parseInt(e.target.value))} />
                </div>
                <div className="block">
                    <label htmlFor="name">So nuoc: </label><br />
                    <input type="number" name="name" value={water} onChange={(e) => setWater(parseInt(e.target.value))} readOnly={object?.water_follow ? true : false} />
                </div>
                <div className="btn">Cap nhat</div>
            </div>
            <div className="service-action">
                <div className="btn" onClick={()=>calculate(2)}>Chuyen di</div>
                <div className="btn" onClick={()=>calculate(1)}>Thanh toán</div>
                <div className="btn" onClick={()=>calculate(0)}>Chuyen den</div>
            </div>
            <div className="service-action">
                <div className="btn" onClick={payed}>Xac Nhan Thanh toán</div>
            </div>
        </>
    )
}