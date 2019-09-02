const mongoose=require('mongoose')

const ConversationSchema=new mongoose.Schema({
 
    to:{
        type:String,
        required:false
    },
    from:{
        type:String,
        required:false
    },
    // message:{
    //     type:[String]
    // }
    record:[
       {
            to:String,
            message:[String],
            datetime:{
                type:Date,
                default:Date.now
            }
        }
        
    ]
    

    

})

const Conversation=mongoose.model('document',ConversationSchema)

module.exports=Conversation