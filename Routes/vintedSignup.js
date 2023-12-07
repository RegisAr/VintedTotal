const express = require("express");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-Base64");
const router = express.Router();
const mongoose = require("mongoose");

// import du model User
const User = require("../Models/VintedUser");

router.post("/user/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, newsletter } = req.body;
    console.log(req.body);
    if (username) {
      const userEmail = await User.findOne({ email: email });
      if (userEmail === null) {
        const token = uid2(64);
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        console.log(token, salt, hash);
        const newUser = new User({
          email: email,
          account: {
            username: username,
          },
          newsletter: newsletter,
          token: token,
          salt: salt,
          hash: hash,
        });
        await newUser.save();
        res.json({
          _id: newUser._id,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        res.status(409).json({ message: "Email already used" });
      }
    } else {
      res.status(400).json({ message: erroor.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
