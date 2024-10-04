const io = require("socket.io")(8802,{
    cors:{
        origin: "http://localhost:5173"
    },
});

let users=[];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
io.on("connection", (socket) => {
    console.log("a user connected", socket.id); 
    
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        //io.emit("getUsers", users);
      });

      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      });
    
      //when disconnect
      socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
 });
