const express = require("express");

const mongoose = require("mongoose");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-Base64");
const router = express.Router();

// import du model user
const User = require("../Models/VintedUser");

router.post("/user/login", async (req, res) => {
  try {
    const userConnected = await User.findOne({ email: req.body.email });
    if (userConnected) {
      const newHash = SHA256(req.body.password + userConnected.salt).toString(
        encBase64
      );
      if (newHash === userConnected.hash) {
        res.json({
          _id: userConnected._id,
          token: userConnected.token,
          account: userConnected.account,
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
