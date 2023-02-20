const mongoose = require("mongoose");
const express = require("express");
const https = require("https");

const bodyParse = require("body-parser");

const app = express();

app.use(bodyParse.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/hotelBook", {
  useNewUrlParser: true,
});

const UserBookSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const RoomBooked = mongoose.model("User", UserBookSchema);

//For backend and express

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Register data to book hotelroom
app.post("/register", async (req, res) => {
  try {
    const user = new RoomBooked(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      res.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

// Getting roombooked details
app.get("/get-room-data", async (req, res) => {
  try {
    const details = await RoomBooked.find({});
    res.send(details);
  } catch (error) {
    console.log(error);
  }
});

// Server setup
app.listen(3000, function () {
  console.log("Serve runing at 3000");
});
