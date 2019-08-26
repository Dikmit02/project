// const route=require('express').Router()
// const User=require('../model/user')
// const jwt=require('jsonwebtoken')
// const bcrypt=require('bcrypt')



// route.post('/user/login', async (req, res) => {
        
//     try{
//       const user= await User.findOne({email:req.body.email})
//       if(!user) return res.send({status:false,error:'Invalid Email'})

//       const isMatch = await bcrypt.compare(req.body.password, user.password)
//       if(!isMatch) return res.send({status:false,error:'Wrong password'})
      

//       const token=jwt.sign({_id:user._id},"diksha");
//       // res.header('auth-token',token).send({status:true})
//       res.cookie('authtoken',token,{httpOnly:true})
//       res.send({status:true})

//   }
//   catch(e){
//       console.log(e)
//   }

  



// })
// module.exports=route