const mongoose=require('mongoose')
var ObjectId = mongoose.Schema.ObjectId;
const ConversationSchema=new mongoose.Schema({
 
    members:{
        type:[ObjectId],
        required:true

    }

    

})

const Conversation=mongoose.model('document',ConversationSchema)

module.exports=Conversation