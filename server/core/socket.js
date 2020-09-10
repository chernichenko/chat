const socket = require('socket.io')

const createSocket = server => {
    const io = socket(server)

    io.on('connection', client => {
        client.on('USER:UPDATE_STATUS', data => {
          io.emit('USER:UPDATE_STATUS', { id: data.id, isOnline: false })
        })
    })

    return io
}

module.exports = createSocket