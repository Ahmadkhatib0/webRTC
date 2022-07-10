import io from "socket.io-client";
import { setPendingFriendsInvitations } from "../store/actions/friendsActions";
import store from "../store/store";

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

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    console.log(pendingInvitations);
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });
};
