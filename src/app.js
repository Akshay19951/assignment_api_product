
const express = require("express");
const cors = require("cors");
const cookieParser= require("cookie-parser");
const {connectToMongoDB} = require("../src/config/db");
const productsRouter = require("./routes/products/products.router");
const authRouter = require("./routes/authentication/authentication.router");

const app = express();

app.use(express.json())
app.use(cookieParser());
connectToMongoDB("mongodb://127.0.0.1:27017/test")
    .then(()=>{
        console.log("Mongodb connected")
    })
    .catch((error)=>{
        console.log("MongoDB Erorr: ", error)
    })

app.use(productsRouter);
app.use(authRouter);
app.use((req, res, next)=>{
    res.status(404).json({msg:"Route not found!!"})
})

module.exports = app