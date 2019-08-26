const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalide email')
            }

        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('paassword cannot be use as Password')
            }
        }

    }
    // ,
     
})
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })

//     if (!user) {
//         return  ('Error: Invalid email')
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//         return  ('Error: Wrong password')
//     }

//     return user
// }

userSchema.pre('save',async function (){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }

})

const User = mongoose.model('user', userSchema)

module.exports = User