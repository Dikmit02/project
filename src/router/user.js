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
    console.log(req.body)
    const emailexists=await User.findOne(
        {email:req.body.email}
    )
    if(emailexists) return res.status(400).send('Email already exist.Try with new one!!!')

    //creating new user
    const user=new User(req.body)
    
    try{
        await user.save()
        // res.status(201).send(user)
        res.redirect('/')
    }
    catch(e){
        res.status(400).send(e)
    }
})

route.post('/user/login', async (req, res) => {
        
        // const user = await User.findByCredentials(req.body.email, req.body.password)
        try{
            const user= await User.findOne({email:req.body.email})
            if(!user) return res.status(400).send('Invalid Email')
    
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(!isMatch) return res.status(400).send('Wrong password')
            
            const token=jwt.sign({_id:user._id},"diksha");
            res.header('auth-token',token).redirect("/allcontacts")
            
    
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
