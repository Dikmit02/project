const express=require('express')
require('./mongoose/mongoose')
const app=express()

const UserRoute=require('./src/router/user')

const CheckAuthentication=require('./check_auth')

app.use(express.json())



app.use(UserRoute)
app.use(CheckAuthentication)

app.listen('9000',()=>{
    console.log('server started at 9000')
})