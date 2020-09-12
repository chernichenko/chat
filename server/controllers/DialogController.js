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
                
                let dialogs = await Dialog.find()
                    .or([{ author: userMyId }, { partner: userMyId }])
                    .populate(['author', 'partner', 'lastMessage'])

                dialogs = dialogs.map(dialog => {
                    let userTo
                    if (userMyId.toString() === dialog.author._id.toString()) userTo = dialog.partner
                    if (userMyId.toString() === dialog.partner._id.toString()) userTo = dialog.author

                    delete dialog.author
                    delete dialog.partner

                    const newDialog = {
                        _id: dialog._id,
                        userTo: userTo,
                        lastMessage: dialog.lastMessage
                    }

                    return newDialog
                })

                res.json(dialogs)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = DialogController