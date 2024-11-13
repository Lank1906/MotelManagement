import BillDetailType from "./bill_details_type";

export default interface BillType{
    id?:number,
    name:string,
    check_in: Date,
    water_follow:boolean,
    data:Array<BillDetailType>
}