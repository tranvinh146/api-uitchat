const socketio = (io) => {
    io.on('connect', (socket) => {
        console.log('a user connected ' + socket.id);    
        socket.on('disconnect', () =>  console.log(socket.id + ' disconnected'));
    });
}

export default socketio;

