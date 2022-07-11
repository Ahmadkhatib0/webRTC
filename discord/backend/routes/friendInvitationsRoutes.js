const express = require("express");
const router = express.Router();
const joi = require("joi");
const validators = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const friendInvitationControllers = require("../controllers/friendsInvitation/friendInvitationControllers");

const postFriendInvitationsSchema = joi.object({
  targetMailAddress: joi.string().email(),
});

const invitationDecisions = joi.object({ id: joi.string().required() });

router.post(
  "/invite",
  auth,
  validators.body(postFriendInvitationsSchema),
  friendInvitationControllers.controllers.postInvite
);

router.post(
  "/accept",
  auth,
  validators.body(invitationDecisions),
  friendInvitationControllers.controllers.postAccept
);

router.post(
  "/reject",
  auth,
  validators.body(invitationDecisions),
  friendInvitationControllers.controllers.postReject
);

module.exports = router;
