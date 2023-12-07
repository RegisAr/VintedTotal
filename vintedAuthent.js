const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Vinted2");

// import des routes Signup et Login
const signup = require("./Routes/vintedSignup");
app.use(signup);

const login = require("./Routes/vintedLogin");
app.use(login);

app.all("*", (req, res) => {
  res.status(400).json({ error: "Wrong route" });
});

app.listen(3000, () => console.log("Server has started"));
