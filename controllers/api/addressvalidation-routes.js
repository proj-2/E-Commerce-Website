const router = require("express").Router();
const fetch = require("node-fetch");
const { User } = require("../../models");
// text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&format=json&apiKey=YOUR_API_KEY
require("dotenv").config();

router.post("/", async (req, res) => {
  console.log(req.body);
  //   const unit = req.body.unit;
  //   const street = req.body.streetAddress;
  //   const postalCode = req.body.postalCode;
  //   const province = req.body.province;
  //   const country = req.body.country;

  var requestOptions = {
    method: "GET",
  };

  const response = await fetch(
    "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=75588a96f2464e63afe0b67bac579ca8",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  //   const response = await fetch(
  //     `https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&format=json&apiKey=75588a96f2464e63afe0b67bac579ca8`,
  //     {
  //       //   method: "GET",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   if (response === "success") {
  //     res.status(204).end();
  //   } else {
  //     res.status(404).end();
  //   }
});
module.exports = router;
