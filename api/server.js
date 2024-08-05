const express =require('express')
const cors = require('cors');
const app=express()
const port = 5000;
app.use(cors()); // Sử dụng middleware CORS
app.use(express.json())

// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// Lắng nghe trên cổng được xác định
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
