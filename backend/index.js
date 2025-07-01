const express = require('express');
const connectdb = require('./connectdb');
const cors = require('cors');
const app = express();

const port = 5173;

//middlewares
connectdb();
app.use(cors());
app.use(express.json()); // for reading json format requests

//start server
app.listen(port, ()=>{
    console.log(`app is listening at localhost:${port}`);
})
