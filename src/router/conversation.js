const route=require('express').Router()
const Conversataion=require('../model/conversation')
// const curruser=require('./user')

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
    const conversation= new Conversataion(req.body)
    try{
        await conversation.save()
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=route