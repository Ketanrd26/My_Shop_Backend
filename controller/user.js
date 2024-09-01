const UserSchema = require("../models/user");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
dotenv.config();
const secreCrypt = process.env.SECRETKEY_CRYPTO;
const jwtkey = process.env.JWT_SECRET;

// user register
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = UserSchema.findOne({ email });

    if (!existingUser) {
      res.status(500).json({
        message: "email already exist",
      });
    }
    const newUser = new UserSchema({
      username: username,
      email: email,
      password: CryptoJS.AES.encrypt(password, secreCrypt).toString(),
    });

    await newUser.save();

    res.status(200).json({
      message: "register successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
// user login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserSchema.findOne({ username });
    const hashPassword = CryptoJS.AES.decrypt(user.password, secreCrypt);

    const userpassword = hashPassword.toString(CryptoJS.enc.Utf8);
    if (!user || userpassword !== password) {
      res.status(401).json({
        message: !user ? "user not exist" : "password do not match",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      jwtkey,
      {
        expiresIn: "1d",
      }
    );
    // const { password, ...others } = user._doc;

    res.status(200).json({
      messgae: "login succesfully",
      user,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
// user updated
const updatedUser = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  if (password) {
    password = CryptoJS.AES.encrypt(password, secreCrypt).toString();
  }

  try {
    const updatedUserData = await UserSchema.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      updatedUserData,
    });
  } catch (error) {
    res.status(402).json({
      error: error.message,
    });
  }
};
// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "user removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// is admin user

const userAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findById(id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all user list
const userList = async (req, res) => {
  try {
    const user = await UserSchema.find();

    res.status(200).json(user.filter((item) => item.isAdmin === false));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// user stats

const userStats = async (req, res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.setFullYear() - 1));
  try {
    const user = await UserSchema.aggregate([
      {
        $match: { createdAt: { $gte: lastyear } },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },

      {
        $group: {
          _id: "$month",
          total: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      messgae: err.message,
    });
  }
};
module.exports = {
  register,
  login,
  updatedUser,
  deleteUser,
  userAdmin,
  userList,
  userStats,
};
