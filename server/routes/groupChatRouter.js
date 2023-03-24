const express = require("express");
const {groupChatController}=require("../controllers/groupChatController")
const router = express.Router();

router.get("/get/channelList",groupChatController.getChannelList)
router.get("/get/conservation",groupChatController.getConservation)
router.get("/get/members",groupChatController.getMembers)
router.post("/new/newchannel",groupChatController.newChannel)
router.post("/new/newmessage",groupChatController.newMessage)
router.post("/new/newmember",groupChatController.newMember)
module.exports=router
