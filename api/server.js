const express =require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken=require('./authen.js');
const app=express()
const port = 5000;

app.use(cors()); // Sử dụng middleware CORS
app.use(express.json())

app.use("/",require("./routers/guestRoute"));

app.use(authenticateToken);

app.use("/type",require("./routers/typeRoute"));
app.use("/room",require("./routers/roomRoute"));
app.use("/renter",require("./routers/renterRoute"));

// Lắng nghe trên cổng được xác định
app.listen(port,'0.0.0.0', () => {
  console.log(`App is running at http://localhost:${port}`);
});
