export default interface BillType{
    id:number,
    room_id:number,
    day:Date,
    room_price:number,
    electric_price:number,
    electric_number:number,
    electric_number_final:number,
    water_price:number,
    water_number:number,
    water_number_final:number,
    service_price:number,
    img_bill:string
}