export default function socket(io) {
    io.on('connection', (socket) => {
		console.log(`user #${socket.id} connected`);
	});
}