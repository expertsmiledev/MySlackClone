const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema

const authSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmCode: {
        type:String
    },
    image:{
        type:String,
        // required:true
    },
    addDate: {
        type:Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const authModel=mongoose.model("authModel",authSchema)

module.exports={
    authModel
}