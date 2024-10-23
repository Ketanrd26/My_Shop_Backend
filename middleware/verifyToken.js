const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtKey = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.sessionobject;
  if (authHeader) {
  const sessionobject = authHeader.split(" ")[1];

    jwt.verify(sessionobject, jwtKey, (err, user) => {
      if (err) {
        res.status(402).json({
          messgae: "token is not valid",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({
      messgae: "you are not authticated",
    });
  }
};

const verifyTokenAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    const { id } = req.params;

    if (req.user.id) {
        next()
    }else{
        res.status(402).json({
            message:"you are not valid for do this"
        })
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
        next()
    }else{
        res.status(402).json({
            message:"you are not valid for do this"
        })
    }
  });
};
module.exports = { verifyToken,verifyTokenAuth ,verifyAdmin};
