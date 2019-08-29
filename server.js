const express=require('express')
require('./mongoose/mongoose')
const path=require('path')
const jwt=require('jsonwebtoken')

const cookieParser=require('cookie-parser');

const app=express()

const UserRoute=require('./src/router/user')
const ConversationRoute=require('./src/router/conversation')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.set('view engine','hbs')

app.use(UserRoute.route)
app.use(ConversationRoute)

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
app.get('/logout',(req,res)=>{
     res.clearCookie('authtoken')
     res.render('index')
})


function verify(req,res,next){
    

    const token=req.cookies.authtoken
    
    if(!token) {
        return res.render('index')
    }
    try{
        
        const payload=jwt.verify(token,"diksha")
        
        if(!payload)
        {
            
            return res.render('index')
        }
        req.user=payload
        
    }
    catch(e){
       
        return res.render('index')
    }
    next()
}

app.listen('9000',()=>{
    console.log('server started at 9000')
})