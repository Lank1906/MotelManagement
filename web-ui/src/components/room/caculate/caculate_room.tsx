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
    const [type, setType] = useState<number>(-1)
    const [filter, setFilter] = useState<Date | undefined>(undefined)
    const [suggest, setSuggest] = useState<any[]>([])
    const [id,setId]=useState<number>(0)

    const context = useContext(MyContext)
    const dataContext = useContext(DataContext)
    const announceContext = useContext(AnnounceContext)
    const loadingContext = useContext(LoadingContext)

    let timeout: ReturnType<typeof setTimeout> | null = null;

    useEffect(() => {
        if (dataContext?.id == -1)
            return
        loadingContext?.setStatus(false)
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
    }, [dataContext?.id])

    function calculate(typez: number) {
        if (dataContext?.id === -1) {
            announceContext?.setMessage("Vui lòng chọn phòng dể thực hiện thao tác!");
            announceContext?.setType("warning");
            announceContext?.setClose(true);
            return;
        } else if (typez === 0) {
            getSuggest()
        } else if (typez === 1 || typez === 2) {
            if (water <= 0 || electric <= 0) {
                announceContext?.setMessage("Vui lòng điền số điện và số nước hợp lệ!");
                announceContext?.setType("warning");
                announceContext?.setClose(true);
                return;
            }
        }

        loadingContext?.setStatus(true)
        setType(typez)
        PostFetch("calculate/" + dataContext?.id,
            {
                water_number: water || 0,
                electric_number: electric || 0,
                type: typez
            }, (data: BillType) => {
                setObject(data)
                loadingContext?.setStatus(false)
            }, context?.data, (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }

    function payed() {
        if (dataContext?.id === -1) {
            announceContext?.setMessage("Vui lòng chọn phòng dể thực hiện thao tác!");
            announceContext?.setType("warning");
            announceContext?.setClose(true);
            return;
        } else if (type === -1) {
            announceContext?.setMessage("Vui lòng chọn loại thanh toán để tạo hóa đơn!");
            announceContext?.setType("warning");
            announceContext?.setClose(true);
            return
        } else if (type === 1 || type === 2) {
            if (water <= 0 || electric <= 0) {
                announceContext?.setMessage("Vui lòng điền số điện và số nước hợp lệ!");
                announceContext?.setType("warning");
                announceContext?.setClose(true);
                return;
            }
        }
        loadingContext?.setStatus(true)
        PutFetch("calculate/" + dataContext?.id,
            {
                water_number: water,
                electric_number: electric,
                type: type,
                id:id
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

    async function filterChange(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            const target = e.target as HTMLInputElement;
            const date = new Date(target.value);
            setFilter(date);
        } catch {
            return;
        }

        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            if (dataContext?.id === -1 || !filter)
                return
            loadingContext?.setStatus(true)
            GetFetch('calculate/' + `${filter.getFullYear()}-${filter.getMonth() + 1}-${filter.getDate()}` + '/' + dataContext?.id,
                (data: BillType) => {
                    setObject(data)
                    loadingContext?.setStatus(false)
                },
                context?.data,
                (data: any) => {
                    announceContext?.setMessage(data.message)
                    announceContext?.setType("danger")
                    announceContext?.setClose(true)
                    loadingContext?.setStatus(false)
                })
        }, 3000)
    }

    async function filterRefresh() {
        setFilter(undefined)
        loadingContext?.setStatus(true)
        GetFetch('calculate/' + dataContext?.id,
            (data: BillType) => {
                setObject(data)
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

    async function getSuggest() {
        loadingContext?.setStatus(true);
        GetFetch('room-rent/suggest',
            (data: any[]) => {
                setSuggest(data)
                setId(data[0].id)
                loadingContext?.setStatus(false)
            },
            context?.data,
            (data: any) => {
                announceContext?.setMessage(data.message)
                announceContext?.setType("danger")
                announceContext?.setClose(true)
                loadingContext?.setStatus(false)
            }
        )
    }

    return (
        <>
            <div className="component">
                <label htmlFor="filter">Tra hóa đơn cũ:</label><br />
                <input type="date" className="input" name="filter" value={filter ? filter.toISOString().split('T')[0] : ''} onChange={(e) => filterChange(e)} />
                <div className="btn" onClick={filterRefresh}><i className="fa-solid fa-arrows-rotate"></i></div>
            </div>
            <table id="list-service">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {object?.data ? object.data.map((item: BillDetailType) => <tr key={item.category}><td>{item.category}</td><td>{item.price}x{item.times}</td><td>{item.sum}</td></tr>) : "Loading"}
                </tbody>
            </table>
            <div className="service-action" style={{ display: filter ? 'none' : 'block' }}>
                <div className="block">
                    <label htmlFor="name">Số điện: </label><br />
                    <input type="number" className="input bg-white" name="name" value={electric} onChange={(e) => setEletric(parseInt(e.target.value))} />
                </div>
                <div className="block">
                    <label htmlFor="name">Số nước: </label><br />
                    <input type="number" className="input bg-white" name="name" value={water} onChange={(e) => setWater(parseInt(e.target.value))} readOnly={object?.water_follow ? true : false} />
                </div>
            </div>
            <div className="service-action" style={{ display: filter ? 'none' : 'block' }}>
                <div className="btn delete" onClick={() => calculate(2)}><i className="fa-solid fa-arrow-right-from-bracket"></i> Chuyển đi</div>
                <div className="btn add" onClick={() => calculate(1)}><i className="fa-solid fa-rotate"></i> Thanh toán</div>
                <div className="btn update" onClick={() => calculate(0)}><i className="fa-solid fa-arrow-left"></i> Chuyển đến</div>
            </div>
            {type===0?<div className="component">
                <label htmlFor="type">Tên</label><br />
                <select className="input" value={id} onChange={(e)=>setId(parseInt(e.target.value))}>
                    {
                        suggest ? suggest.map((item: any) => {
                            return (<option value={item.id} key={item.id}>{item.username} - {item.phone}</option>)
                        }) : ''
                    }
                </select>
            </div>:''}
            
            <div className="service-action" style={{ display: filter ? 'none' : 'block' }}>
                <div className="btn add" onClick={payed}><i className="fa-solid fa-money-bill"></i> Xác nhận tạo hóa đơn</div>
            </div>
            {loadingContext?.status ? <Loader /> : ''}
        </>
    )
}