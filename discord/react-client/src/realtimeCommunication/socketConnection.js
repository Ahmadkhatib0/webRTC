import io from "socket.io-client";

let socket = null;
export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io.connect("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });
  socket.on("connect", () => {
    console.log(socket.id);
  });
};
