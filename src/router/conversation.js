const route=require('express').Router()
const Conversataion=require('../model/conversation')

const jwt=require('jsonwebtoken')

route.get('/conversation',async(req,res)=>{
    try{
       
        const conversation=await Conversataion.find({})
        res.send(conversation)
    }
    catch(e){
        res.status(500).send(e)
    }
})

route.post('/conversation',async(req,res)=>{
  
    try{
        const token=req.cookies.authtoken
        const payload= await jwt.verify(token,"diksha")
        
        
        req.body.members.push(payload._id)
        
        const conversation=  new Conversataion(req.body)
        await conversation.save()
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=route