const {GetList,Calculate,CalculateByDate,AddBill}=require('../models/calculate');

async function List(req,res){
    const result=await GetList({"rooms.user_id":req.user.id,"rooms.id":req.params.id});
    if(result)
        return res.status(200).json(result)
    else
        return res.status(400).json({"message":"Tính toán thất bại"})
}

async function Bill(req,res){
    const result=await Calculate({"rooms.user_id":req.user.id,"rooms.id":req.params.id,...req.body})
    if(result)
        return res.status(200).json(result)
    else
        return res.status(400).json({"message":"Tính toán thất bại"})
}

async function BillByDate(req,res){
    const result=await CalculateByDate(req.params.date,{"rooms.user_id":req.user.id,"rooms.id":req.params.id,...req.body})
    if(result)
        return res.status(200).json(result)
    else
        return res.status(400).json({"message":"Tính toán thất bại"})
}

async function Pay(req,res){
    try{
        const result=await AddBill({"rooms.user_id":req.user.id,"rooms.id":req.params.id,...req.body})
        if(result)
            res.status(200).json({"message":"Đã thanh toan thành công!","id":result});
        else
            return res.status(400).json({"message":"Thanh toan that bai"})
    }
    catch{
        return res.status(400).json({"message":"Loi"})
    }
}

module.exports={List,Bill,BillByDate,Pay}