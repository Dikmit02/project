const route=require('express').Router()
const veriftyFunction=require('./verifyToken')
const User=require('./src/model/user')

route.get('/verfied',veriftyFunction,async (req,res)=>{
    // res.send(req.user)
    // contains the authenticate obj
    try{
        
        const user =await  User.findById(req.user._id)
        
        res.send(user)
      
    }
    catch(e){
        res.status(400).send('ok')
    }
})

module.exports=route