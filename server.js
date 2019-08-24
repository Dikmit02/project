const express=require('express')
require('./mongoose/mongoose')
const path=require('path')
const hbs=require('hbs')

const app=express()

const UserRoute=require('./src/router/user')
const CheckAuthentication=require('./check_auth')

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.set('view engine','hbs')

app.use(UserRoute)
app.use(CheckAuthentication)
app.use('/',express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/allcontacts',(req,res)=>{
    res.render('allcontacts')
})

app.listen('9000',()=>{
    console.log('server started at 9000')
})