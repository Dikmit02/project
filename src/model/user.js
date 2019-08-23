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
        unique: true,
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

    },
    age:{
        type:Number,
        default:0,
        required:true,
        validate(value){
            if(value<0){
                throw new Error("Age cannot be negative")
            }
        }
            
            
    },
    department:{
        type:String,
        require:true,
        minlength:3
    }
})
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save',async function (){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }

})

const User = mongoose.model('user', userSchema)

module.exports = User