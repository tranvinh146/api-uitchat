export default function socket(io) {
    io.on('connection', (socket) => {
		console.log('a user connected');
	});
}