const jwt = require('jsonwebtoken');
const roles = require('../../constants/roles')
const jwtSign = process.env.JWT_SIGNATURE

exports.roleBaseMiddleWare = (req, res, next) => {
  // const cred = {
  //   username: "Aditya",
  //   password: "admin@1234",
  //   role: "admin"
  // }
  // const token = jwt.sign(cred, jwtSign);  
  // console.log(token);

  const token = req.headers['jwttoken']
  
  if(!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, jwtSign);
    if(decoded.role === roles.Admin) {
      return next();
    }
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  next();
}