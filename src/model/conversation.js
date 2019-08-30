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
    datetime:{
        type:Date,
        default: Date.now,
    },
    message:{
        type:[String]
    }
    

    

})

const Conversation=mongoose.model('document',ConversationSchema)

module.exports=Conversation