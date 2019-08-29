const route=require('express').Router()
const User=require('../model/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
var  userid=0


route.get('/user',async(req,res)=>{
   try{
    const user= await User.find({ _id: { $nin: userid } })
    res.send(user)
   }
   catch(e){
       res.status(500).send(e)
   }
 
})

route.post('/register',async(req,res)=>{
    // check if user exist
    const emailexists=await User.findOne(
        {email:req.body.email}
    )
    if(emailexists) {
       return  res.send({status:false,error:"email already exists"})
    }
    //creating new user
    const user=new User(req.body)
    user.save()
    .then(x=>res.send({status:true}))
    .catch(e=>res.send({status:false,error:e}))
})

route.post('/user/login', async (req, res) => {
        
          try{
            const user= await User.findOne({email:req.body.email})
            if(!user) return res.send({status:false,error:'Invalid Email'})
    
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch) return res.send({status:false,error:'Wrong password'})
            

            const token=jwt.sign({_id:user._id},"diksha",{ expiresIn: '7d' },);
            // res.header('auth-token',token).send({status:true})
            res.cookie('authtoken',token,{httpOnly:true})
            userid=user._id
            
            res.send({status:true})
    
        }
        catch(e){
            console.log(e)
        }
})





module.exports={route}
