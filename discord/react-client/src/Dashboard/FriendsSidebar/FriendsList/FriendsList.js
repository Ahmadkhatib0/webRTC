import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";

const dummy = [
  { id: 1, username: "ahmad", isOnline: true },
  { id: 2, username: "ali", isOnline: false },
  { id: 3, username: "noor", isOnline: true },
  { id: 4, username: "reem", isOnline: false },
];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  return (
    <MainContainer>
      {dummy.map((friend) => (
        <FriendsListItem
          username={friend.username}
          id={friend.id}
          isOnline={friend.isOnline}
          key={friend.id}
        />
      ))}
    </MainContainer>
  );
};

export default FriendsList;
