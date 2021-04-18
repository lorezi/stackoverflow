import socketIo from "socket.io";

const io = new socketIo.Server();

io.on("connection", () => {
  console.log("socket connection successful");
});

export default io;
