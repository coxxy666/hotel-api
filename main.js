const express = require("express");
const https = require("https");

const bodyParse = require("body-parser");

const app = express();

app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.hotelinput);

  const hotelDetails = {
    hotelname: "kinghotel",
    location: "uk",
    price: 50,
  };
  https.get(hotelDetails, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const hotelData = JSON.parse(data);
      const location = hotelData.hotelDetails.hotelname;
      const price = hotelData.hotelDetails.price;
      res.write("The location of te hotel is" + location);
      res.write("24hours price is $" + price);
    });
  });
  //   res.send("Serve is up and runing");
  console.log("Post request recieved");
});

app.listen(1000, function () {
  console.log("Serve runing at 3000");
});
