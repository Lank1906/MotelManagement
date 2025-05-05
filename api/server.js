const express =require('express')
const cors = require('cors');
const fs = require('fs');
const authenticateToken=require('./authen.js');
const {LoginRenter,SignUpRenter}=require('./controllers/mobileController.js');

//npm install nodemon --save-dev

//upload file
const multer = require('multer');
const path = require('path');

const app=express()
const port = 5000;

app.use(cors()); // Sử dụng middleware CORS

app.use("/",express.json(),require("./routers/userRoute"));
app.use("/mobile/login",express.json(),LoginRenter);
app.use("/mobile/signup",express.json(),SignUpRenter);

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
        console.log(error)
        res.status(400).send('Có lỗi xảy ra khi upload');
    }
});
app.get('/api/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
        if (err) return res.status(404).send('Not found');
        res.send({ base64: `data:image/jpeg;base64,${data}` });
    });
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
