const User = require('../models/User')
const Dialog = require('../models/Dialog')
const Message = require('../models/Message')

class DialogController {
    constructor(io) {
        this.io = io
    }

    getDialog = async (req, res) => {
        try {
            if (req.user) {
                const ID1 = req.user.userId
                const ID2 = req.query.userToId
 
                let dialog = await Dialog.findOne()
                    .or([{ author: ID1, partner: ID2 }, { author: ID2, partner: ID1 }])

                if (!dialog) {
                    dialog = new Dialog({ author: ID1, partner: ID2 })
                    await dialog.save() 
                }

                res.json(dialog)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }

    getDialogsToSidebar = async (req, res) => {
        try {
            if (req.user) {
                const userMyId = req.user.userId
                const usersResponse = await User.find()
                const users = usersResponse
                    .filter(user => user._id.toString() !== userMyId.toString())
                    .map(user => {
                        return {
                            _id: user._id,
                            name: user.name,
                            avatarUrl: user.avatarUrl,
                            lastSeen: user.lastSeen,
                            isOnline: user.isOnline
                        }
                    })

                // Тут має буть метод, який витягує юзерів, діалоги, та їх останні смс

                // let dialogs = await Dialog.find()
                // dialogs = dialogs
                //     .filter(dialog => {
                //         if (userMyId == dialog.author || userMyId == dialog.partner) {
                //             return true
                //         }
                //         return false
                //     })
                //     .forEach(dialog => {
                //         const dialogId = dialog._id
                //         const message = await Message.find({ dialog: dialogId })
                //         console.log(message)
                //     })

                res.json(users)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = DialogController