const mongoose=require('mongoose')

const RecordSchema=new mongoose.Schema({

_id:{
    type:String
},record:[
    {
         to:String,
         from:String,
         message:String,
         datetime:{
             type:Date,
             default:Date.now
         }
     }
     
 ]


})

const Record=mongoose.model('record',RecordSchema)

module.exports=Record