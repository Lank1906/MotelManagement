const {SignUp,Login,UpdateInfo}=require('../models/user');
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
    console.log(req.body);
    const result=await Login(req.body);
    if(typeof result=='object'){
        const token = jwt.sign({ id:result.id,username:req.body.username,per:result.per }, 'Lank1906', { expiresIn: '6h' });
        delete result.id;
        console.log("Login success!")
        return res.status(200).json({ "message":"Đăng nhập thành công !","token":token,"info":result });
    }
    else{
        console.log("Password error!")
        return res.status(401).json({ "message":"Tài khoản hoặc mật khẩu không đúng !"});
    }
}

async function UpdateInfoCon(req,res){
    const result=await UpdateInfo(req.body,{'username':req.user.username});
    if(result>1){
        return res.status(200).json({"message":"Cập nhật thành công!"});
    }
    else{
        return res.status(401).json({"message":"Cập nhật thất bại !"});
    }
}

module.exports={SignUpCon,LoginCon,UpdateInfoCon};