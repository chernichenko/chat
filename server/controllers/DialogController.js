const Dialog = require('../models/Dialog')

const DialogController = {
    getDialog: async (req, res) => {
        try {
            if (req.user) {
                const { userToId } = req.body

                let dialog = await Dialog.findOne({ _id: req.user.userId })

                // DialogModel.find()
                //     .or([{ author: userId }, { partner: userId }])
                //     .populate(['author', 'partner'])
                //     .populate({
                //         path: 'lastMessage',
                //         populate: {
                //         path: 'user',
                //         },
                //     })
                //     .exec(function (err, dialogs) {
                //         if (err) {
                //         return res.status(404).json({
                //             message: 'Dialogs not found',
                //         });
                //         }
                //         return res.json(dialogs);
                //     })

                if (!dialog) {
                    dialog = new Dialog({ author: req.user.userId, partner: userToId })
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
}

module.exports = DialogController