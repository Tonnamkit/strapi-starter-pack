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
          origin:"http://localhost:5173",
          methods:["GET","POST"],
          allowedHeaders: ["my-custom-header"],
          credentials: true
        }
      }) 

      let feedbacks = [];

      io.on("connection",(socket) => {{
        console.log("A user connected: ",socket.id);

        socket.on("sendFeedbacks",(newFeedback)=> {
          feedbacks.push(newFeedback)          
          io.emit("recvFeedbacks", newFeedback)
        });

        socket.on("disconnected", () =>{
          console.log("User disconnected: ", socket.id);
        })
      }})

      strapi.io = io;
  },
};
