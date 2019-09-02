const route=require('express').Router()
const Conversataion=require('../model/conversation')

const jwt=require('jsonwebtoken')



route.post('/conversation',async(req,res)=>{
  
    try{
        const token=req.cookies.authtoken
        const payload= await jwt.verify(token,"diksha")
        const ifalreadyexists=await Conversataion.findOne(
            {
                to:payload._id,from:req.body.to
            }
            
         )
         const ifalreadyexists_2=await Conversataion.findOne(
             {
                 from:payload._id,to:req.body.to
             }
             
          )
         if(ifalreadyexists||ifalreadyexists_2){
             return res.send({status:false,error:"Already exists"})
         }
        
         
        const conversation=  new Conversataion({from:payload._id,to:req.body.to})
        await conversation.save()
    }
    catch(e){
        res.status(500).send(e)
    }
})


// route.get('/conversation',async(req,res)=>{
//     try{
       
//         const conversation=await Conversataion.find({})
//         res.send(conversation)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

// route.get('/conversation/:to/:from',async(req,res)=>{
//     const to=req.params.to
//     const from=req.params.from

//     try{
//         const conversation =await Conversataion.find({to:to,from:from}).select("message")
        
//         res.send(conversation)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

route.post('/conversation/:to/:from',async(req,res)=>{
    const to=req.params.to
    const from=req.params.from

    try{
        console.log("Inside con/to/from")
        console.log()
        // const conversation =await Conversataion.update({ to:to,from:from},{$push:{message:req.body.message}})
        const conversation=await Conversataion.update({to:to,from:from },{$push:{record:{to:to,message:"dik"}}})
        console.log("Inside con/to/from 2")
        res.send(conversation)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=route