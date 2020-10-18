require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED')
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

app.use("/api",authRoute)
app.use("/api",userRoute)

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});