const express =require('express')
const cors = require('cors');
const app=express()
const port = 5000;

app.use(cors()); // Sử dụng middleware CORS
app.use(express.json())

app.use("/",require("./routers/guestRouter"))

// Lắng nghe trên cổng được xác định
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
