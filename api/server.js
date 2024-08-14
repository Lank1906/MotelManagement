const express =require('express')
const cors = require('cors');
const authenticateToken=require('./authen.js');
const app=express()
const port = 5000;

app.use(cors()); // Sử dụng middleware CORS
app.use(express.json())

app.use("/",require("./routers/guestRouter"));

app.use(authenticateToken);

app.use("/type",require("./routers/typeRoute"));

// Lắng nghe trên cổng được xác định
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
