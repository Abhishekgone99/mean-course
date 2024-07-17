const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_key_that_should_be_longer_for_better_token");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!!. token not found",
    });
  }
};
