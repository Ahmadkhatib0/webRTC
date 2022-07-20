const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, password, mail } = req.body;
    const userExits = await User.exists({ mail: mail.toLowerCase() });
    if (userExits) return res.status(409).send("E-mail is already in use");

    const encryptPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptPassword,
    });
    const token = jwt.sign({ userId: user._id, mail }, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).send("oops, an error occurred, please try again");
  }
};

module.exports = postRegister;
