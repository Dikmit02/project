const express=require('express')
require('./mongoose/mongoose')
const path=require('path')
const hbs=require('hbs')
const jwt=require('jsonwebtoken')
const socketio=require('socket.io')
const http=require('http')

const cookieParser=require('cookie-parser');

const app=express()
const server=http.createServer(app)
const io=socketio(server)

const UserRoute=require('./src/router/user')
const ConversationRoute=require('./src/router/conversation')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.set('view engine','hbs')
hbs.registerPartials(path.join(__dirname,'/partials'))

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

io.on('connection', (socket) => {

    

    // Handle chat event
    socket.on('chat', function(data){
        
        io.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});

server.listen('9000',()=>{
    console.log('server started at 9000')
})