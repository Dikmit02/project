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
        
        const conversation=  new Conversataion({from:payload._id,to:req.body.to})
        await conversation.save()
    }
    catch(e){
        res.status(500).send(e)
    }
})
route.get('/user/conversation/:idto/:idfrom',async(req,res)=>{
    
    try{

    }
    catch{

    }

})
module.exports=route