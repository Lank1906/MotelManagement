const express =require('express')
const cors = require('cors');
const authenticateToken=require('./authen.js');

//npm install nodemon --save-dev

//upload file
const multer = require('multer');
const path = require('path');

const app=express()
const port = 5000;

app.use(cors()); // Sử dụng middleware CORS

app.use("/",express.json(),require("./routers/userRoute"));

//ap dung xac thuc
app.use(authenticateToken);

//route upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});
// Route upload file không cần JSON
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        res.send(req.file.filename);
    } catch (error) {
        res.status(400).send('Có lỗi xảy ra khi upload');
    }
});

// ap dung json cho cac router duoi
app.use(express.json())

app.use("/type",require("./routers/typeRoute"));
app.use("/service",require("./routers/serviceRoute"));
app.use("/room",require("./routers/roomRoute"));
app.use("/room-service",require("./routers/roomServiceRoute"));
app.use("/room-rent",require("./routers/roomRentRoute"));
app.use("/history",require("./routers/historyRoute"));
app.use("/calculate",require("./routers/calculateRoute"))
app.use("/announce",require("./routers/announceRoute"))
app.use("/mobile",require("./routers/mobileRoute"))

// Lắng nghe trên cổng được xác định
app.listen(port,'0.0.0.0', () => {
  console.log(`App is running at http://localhost:${port}`);
});
