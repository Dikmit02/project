const mongoose=require('mongoose')
const shortid = require('shortid');
const ConversationSchema=new mongoose.Schema({
    
    _id: {
        'type': String,
        'default': shortid.generate
      },

    to:{
        type:String,
        required:false
    },
    from:{
        type:String,
        required:false
    }
    
  
    

    

})

const Conversation=mongoose.model('document',ConversationSchema)

module.exports=Conversation