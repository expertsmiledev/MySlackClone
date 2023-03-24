
const {groupChatModel}=require("../models/groupChatSchema")

const groupChatController = {
    newChannel: (req, res) => {
        const dbData = req.body
        groupChatModel.create(dbData, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        })
    },
    newMessage: (req, res) => {
        const id = req.query.id
        const newMessage = req.body
        console.log(req.body)
        groupChatModel.updateOne(
            { _id: id },
            { $push: { conservation: newMessage } },
            (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(201).send(data)
                }
            }
        )
    },
    newMember:(req, res) => {
        const id = req.query.id
        const newMember = req.body
         groupChatModel.updateOne(
                { _id: id },
                { $push: { members: newMember } },
                (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(201).send(data)
                    }
                }
     )
    },
    getChannelList: (req, res) => {
        const channelName = req.query.channelName
        groupChatModel.find({channelName: {$regex:channelName,$options:"$i"}}).exec((err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                let channels = []
                data.map((channelData) => {
                    const channelInfo = {
                        id: channelData._id,
                        name: channelData.channelName,
                        description: channelData.channelDescription
                    }
                    channels.push(channelInfo)
                })
                res.status(200).send(channels)
            }
        })
    },
    getConservation: (req, res) => {
        const id = req.query.id
        groupChatModel.find({ _id: id}, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })
    },
    getMembers: (req, res) => {
        const id = req.query.id
        groupChatModel.find({ _id: id }, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })
    },

}

module.exports={
    groupChatController
}