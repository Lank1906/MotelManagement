const {SignUp,Login,UpdateInfo}=require('../models/guest');
const jwt = require('jsonwebtoken');


async function SignUpCon(req,res){
    const result=await SignUp(req.body);
    if(result>0){
        return res.status(200).json({"message":"Đăng ký thành công !"});
    }
    else if(result.startsWith("Duplicate entry")){
        return res.status(401).json({"message":"Tên đăng nhập đã tồn tại !"});
    }
    else{
        return res.status(401).json({"message":"Đăng ký thất bại !"});
    }
}

async function LoginCon(req,res){
    const result=await Login(req.body);
    if(result.length==1){
        console.log(result)
        const token = jwt.sign({ id:result[0].id,username:result[0].username }, 'Lank1906', { expiresIn: '6h' });
        return res.status(200).json({ "message":"Đăng nhập thành công !","token":token });
    }
    else{
        return res.status(401).json({"message":"Thông tin đang nhập không đúng hoặc tài khoản không tồn tại !"})
    }
}

async function UpdateInfoCon(req,res){
    const result=await UpdateInfo(req.body,{'id':req.user.id});
    if(result==1){
        return res.status(200).json({"message":"Cập nhật thành công!"});
    }
    else{
        return res.status(401).json({"message":"Cập nhật thất bại !"});
    }
}

module.exports={SignUpCon,LoginCon,UpdateInfoCon};