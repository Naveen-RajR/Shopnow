const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  console.log(req.headers);
  let bearerToken = req.headers.authorization;
  if (bearerToken == undefined)
    res.send({
      message: "You're not authorized to use",
    });
  else {
    let token = bearerToken.split(" ")[1];
    jwt.verify(token, "dflkjkldjkfjdj", (err, decodedToken) => {
      if (err) res.send({ message: "Session Expired...try to relogin" });
      else next();
    });
  }
};

module.exports=verifyToken