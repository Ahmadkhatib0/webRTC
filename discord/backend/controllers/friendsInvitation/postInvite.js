const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  return res.send("hey");
};

module.exports = postInvite;
