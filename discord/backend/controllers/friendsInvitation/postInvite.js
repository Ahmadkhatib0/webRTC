const User = require("../../models/user");
const friendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  if (mail.toLowerCase() === targetMailAddress.toLowerCase())
    return res.status(409).send("sorry, you can't invite your self");

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });
  if (!targetUser)
    return res
      .status(404)
      .send(
        `friend of ${targetMailAddress}, hasn't been found, please check the mail `
      );
  const invitationAlreadyReceived = await friendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived)
    return res.status(409).send("invitation has been already sent");
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );
  if (usersAlreadyFriends)
    return res.status(409).send("user is already your friend");

  const newInvitation = await friendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("invitation has been sent");
};

module.exports = postInvite;
