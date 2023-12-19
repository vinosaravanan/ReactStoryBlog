const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
        timestamps:false
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
        minlength: 6
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",require:true,}]
});
module.exports = mongoose.model("User", userSchema)
