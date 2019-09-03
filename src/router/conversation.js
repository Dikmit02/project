const route=require('express').Router()
const Conversataion=require('../model/conversation')

const jwt=require('jsonwebtoken')
var result_id=""


route.post('/conversation',async(req,res)=>{
  
    try{
        const token=req.cookies.authtoken
        const payload= await jwt.verify(token,"diksha")
        const ifalreadyexists=await Conversataion.findOne({ to:payload._id,from:req.body.to},{_id:1})
       
        const ifalreadyexists_2=await Conversataion.findOne({from:payload._id,to:req.body.to},{_id:1})
     
        if(ifalreadyexists||ifalreadyexists_2){
            if(ifalreadyexists!==null){
                return res.send({_id:ifalreadyexists._id})
            }
          
            if(ifalreadyexists_2!==null){
                return res.send({_id:ifalreadyexists_2._id})
            }
            
        }
        else{
            const conversation=  new Conversataion({from:payload._id,to:req.body.to})
            await conversation.save(function(err,result){
           
                res.send({_id:result._id})
            })
        }
        
         
        
    }
    catch(e){
        res.status(500).send(e)
    }
})


route.post('/conversation/:to/:from',async(req,res)=>{
    const to=req.params.to
    const from=req.params.from

    try{
       
        // const conversation =await Conversataion.find({from:from,to:to}).select(to._id)
        const conversation =await Conversataion.find({},{_id:1})
        res.send(conversation)
    }
    catch(e){
        res.status(500).send(e)
    }
})


// route.post('/conversation/:to/:from',async(req,res)=>{
//     const to=req.params.to
//     const from=req.params.from

//     try{
//         // const conversation =await Conversataion.update({ to:to,from:from},{$push:{message:req.body.message}})
//         const conversation=await Conversataion.update({to:to,from:from },{$push:{record:{to:to,message:req.body.message}}})
   
//         res.send(conversation)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

module.exports=route




// route.get('/conversation',async(req,res)=>{
//     try{
       
//         const conversation=await Conversataion.find({from:req.body.from,to:req.body.to})
//         res.send(conversation)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })
