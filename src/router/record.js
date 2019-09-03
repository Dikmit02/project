const route=require('express').Router()
const Record=require('../model/record')

route.post('/record/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const record=await Record.updateOne({_id:id},{$push:{record:{to:"klmklbvmn",from:"mlhmnlk",message:"mkbmklg"}}})
        await record.save()
    }
    catch(e){
        res.status(500).send(e)
    }
})

route.post('/record',async(req,res)=>{
   
    try{
        const ifalreadyexists=await Record.findById({_id:req.body._id},{_id:1})
        if(ifalreadyexists){
            return res.send(ifalreadyexists)
        }
        else{
            const record=await new Record({_id:req.body._id})
            await record.save(function(err,result){
               
                res.send({_id:result._id})
            })
        }
        
    }
    catch(e){
        res.status(500).send(e)
    }
})
module.exports=route