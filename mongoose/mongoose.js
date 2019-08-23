const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost/project_mongo",{
    useNewUrlParser:true,
    useCreateIndex:true
})

module.exports=mongoose