import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const  userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
    },
    isAdmin:{
        type:Boolean,
        requried:true,
        default: false,
    },

},{
    timestamps:true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;