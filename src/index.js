'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    let { Server } = require("socket.io");
      let io = new Server(strapi.server.httpServer,{
        cors:{
          origin:"*",
          methods:["GET","POST"],
          credentials: true
        }
      }) 

      let feedbacks = [];
      let comments = [];

      io.on("connection",(socket) => {{
        console.log("A user connected: ",socket.id);

        socket.on("joinRoom", (room) => {
          socket.join(room)
          console.log(`User ${socket.id} joined room ${room}`);
        })

        socket.on("sendMessages",(newMessage)=> {
          console.log(newMessage);
          feedbacks.push(newMessage)        
          io.emit("recvMessages", newMessage)
        });

        
        socket.on("sendComments",(newComment) =>  {
          comments.push(newComment);

          const room = newComment.topic
          io.to(room).emit("recvComments",newComment);
        })

        socket.on("disconnected", () =>{
          console.log("User disconnected: ", socket.id);
        })
      }})

      strapi.io = io;
  },
};
