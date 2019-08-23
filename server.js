const express=require('express')
require('./mongoose/mongoose')
const app=express()

const UserRoute=require('./src/router/user')

app.use(express.json())



app.use(UserRoute)





// const user=new User({
//     name:'diksha',
//     email:'diksha@g.in'
// }).save().then((result)=>{
//     console.log(result)
// })
// .catch((e)=>{
//     console.log("Error "+e)
// })


app.listen('9000',()=>{
    console.log('server started at 9000')
})