const express=require('express')
require('./mongoose/mongoose')
const path=require('path')
const hbs=require('hbs')
const jwt=require('jsonwebtoken')

const cookieParser=require('cookie-parser');


const app=express()

const UserRoute=require('./src/router/user')
// const CheckAuthentication=require('./check_auth')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.set('view engine','hbs')

app.use(UserRoute)

// app.use(CheckAuthentication)
app.use('/',express.static(path.join(__dirname,'/public')))

app.get('/',verify,(req,res)=>{
  res.render('allcontacts')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
// app.get('/allcontacts',(req,res)=>{
//     res.render('allcontacts')
// })


function verify(req,res,next){
    console.log("verify")

    const token=req.cookies.authtoken
    console.log(token)
    if(!token) {
        return res.render('index')
    }
    try{
        console.log('inisde try catch')
        const payload=jwt.verify(token,"diksha")
        console.log(payload)
        if(!payload)
        {
            console.log('not pyaload')
            return res.render('index')
        }
        req.user=payload
        
    }
    catch(e){
        console.log('there is some error',e)
        return res.render('index')
    }
    next()
}

app.listen('9000',()=>{
    console.log('server started at 9000')
})