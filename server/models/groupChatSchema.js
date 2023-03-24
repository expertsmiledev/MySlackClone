const { default: mongoose, Types } = require("mongoose");
const Schema=mongoose.Schema


const shcema= new Schema({
    channelName:String,
    channelDescription:String,
    conservation:[
        {
            message:Schema.Types.Mixed,
            timeStamp:String,
            user:String,
            userİmage: String, 
            liked:Boolean,
            messageType:String
        }
    ],
    members:[
        {
            userName:String,
            userİmage:String,
            email:String
        }
    ]
})

const groupChatModel=mongoose.model("groupChatModel",shcema)

module.exports={
    groupChatModel
}