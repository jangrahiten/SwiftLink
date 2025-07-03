const express = require('express');
const connectdb = require('./connectdb');
const cors = require('cors');
const urlrouter = require('./Routes/url.routes');
const { geturl } = require('./controllers/url.controller');
const app = express();
const port = 5173;

//middlewares
connectdb();
app.use(cors());
app.use(express.json()); // for reading json format requests

//routes
app.use('/url', urlrouter);
app.get('/:shortID', geturl);
//start server
app.listen(port, ()=>{
    console.log(`app is listening at localhost:${port}`);
})

