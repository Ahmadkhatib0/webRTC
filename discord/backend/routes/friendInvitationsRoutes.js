const express = require("express");
const router = express.Router();
const joi = require("joi");
const validators = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const friendInvitationControllers = require("../controllers/friendsInvitation/friendInvitationControllers");

const postFriendInvitationsSchema = joi.object({
  targetMailAddress: joi.string().email(),
});

router.post(
  "/invite",
  auth,
  validators.body(postFriendInvitationsSchema),
  friendInvitationControllers.controllers.postInvite
);

module.exports = router;
