const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const invitationExists = await FriendInvitation.exists({ _id: id });
    if (invitationExists) await FriendInvitation.findByIdAndDelete(id);
    friendsUpdate.updateFriendsPendingInvitations(userId);
    return res.status(200).send("invitation successfully rejected");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};

module.exports = postReject;
