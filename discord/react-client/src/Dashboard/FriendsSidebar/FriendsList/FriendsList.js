import React from "react";
import { connect } from "react-redux";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach((f) => {
    const isOnline = onlineUsers.find((user) => user.userId === f.id);
    f.isOnline = isOnline ? true : false;
  });
  return friends;
};

const FriendsList = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((friend) => (
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

const mapStoreStateToProps = ({ friends }) => {
  return { ...friends };
};

export default connect(mapStoreStateToProps)(FriendsList);
