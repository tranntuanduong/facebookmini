const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// when a user join on socket [app.js]
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // connect
  console.log(socket.id + "_connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send message
  socket.on("sendMessage", (messageData) => {
    const user = getUser(messageData.receiverId);
    console.log("receiverID:", user);
    console.log("List user:", users);

    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId: messageData.senderId,
        text: messageData.text,
      });
      console.log("emit getMessage:", user.socketId, messageData);
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log(socket.id + "_disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
