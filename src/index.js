const e = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const userRouter = require("./routes/v1/user.route")

let server;

mongoose.connect(config.mongoose.url)
.then(()=>{
    console.log(`connected to DB at ${config.mongoose.url}`)   
    console.log("************************************************************************************************")
}).catch((error)=>{
    throw(error);
})



app.listen(config.port, ()=>{
    console.log(`server started at port ${config.port}`)
})

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
