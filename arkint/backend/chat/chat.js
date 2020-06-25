module.exports = function (io) {
    // io.on('connection', function (socket) {
    //     socket.on('new-message', function (message) {
    //         console.log(message);
    //         io.emit(message)
    //         // logger.log('info', message.value);
    //         // socket.emit('ditConsumer', message.value);
    //         // console.log('from console', message.value);
    //     });
    // });


    io.on('connection', (socket) => {

        console.log(`New connection ${socket.id}`)

        // Listening for chat event
        socket.on('chat', function (data) {
            // console.log('chat event trigged at server');
            // console.log('need to notify all the clients about this event');
            io.sockets.emit('chat', data);
        });
    })
}