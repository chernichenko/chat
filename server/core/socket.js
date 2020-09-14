const socket = require('socket.io')
const Message = require('../models/Message')

const createSocket = server => {
    const io = socket(server)

    io.on('connection', client => {
        client.on('USER:UPDATE_STATUS', data => {
          io.emit('USER:UPDATE_STATUS', { id: data.id, isOnline: false })
        })

        // client.on('MESSAGE:UPDATE_IS_READ', async data => {
        //   await Message.update(
        //     {"_id": data.message._id }, 
        //     {"$set":{"isRead": true}}
        //   ) 
        //   io.emit('MESSAGE:UPDATE_IS_READ', data)
        // })
    })

    return io
}

module.exports = createSocket