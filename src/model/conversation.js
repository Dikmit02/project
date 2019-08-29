const mongoose=require('mongoose')

const ConversationSchema=new mongoose.Schema({
 
    members:{
        type:[String],
        required:true

    }

    

})

const Conversation=mongoose.model('document',ConversationSchema)

module.exports=Conversation