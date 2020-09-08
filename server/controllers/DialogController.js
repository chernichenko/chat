const Dialog = require('../models/Dialog')

const DialogController = {
    getDialog: async (req, res) => {
        try {
            if (req.user) {
                const ID1 = req.user.userId
                const ID2 = req.query.userToId
 
                let dialog = await Dialog.find()
                    .or([{ author: ID1, partner: ID2 }, { author: ID2, partner: ID1 }])

                // if (!dialog.length) {
                //     dialog = new Dialog({ author: ID1, partner: ID2 })
                //     await dialog.save() 
                // }

                res.json(dialog)
            } else {
                res.status(401).json({ message: 'Не зарегистрирован' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
        }
    }
}

module.exports = DialogController