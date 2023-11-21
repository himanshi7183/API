const express = require('express')
const app =express()
const dotenv =require('dotenv')
dotenv.config({path:'./.env'})   //config s path set ho jaaega port ka
const web = require('./routes/web') //require web.js file
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload")
const cors = require('cors')   //this is use for communication iske bina api work ni kregi bina iske api call ni ho paaegi react k andr


app.use(cors()) 
// insert image
app.use(fileUpload({useTempFiles:true}))

// connect database
connectdb()

//data get in api
app.use(express.json())

// load route
app.use('/api',web)  
// local host :4000/api










// server create
app.listen(process.env.PORT,()=>{
    console.log(`server running on port local host: ${process.env.PORT}`)
})   //process use kia hai .env file m port ko access krne k lie