const route=require('express').Router()
const User=require('../model/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')



route.get('/user',async(req,res)=>{
   try{
    const user= await User.find({})
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
            
            const token=jwt.sign({_id:user._id},"diksha");
            res.header('auth-token',token).send({status:true})
            
    
        }
        catch(e){
            console.log(e)
        }

        


    
})


route.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age','department']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

route.delete('/user/:id',async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports=route
