const router = require("express").Router();
const fetch = require("node-fetch");
const { User } = require("../../models");
// text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&format=json&apiKey=YOUR_API_KEY
require("dotenv").config();

router.post("/", async (req, res) => {
  console.log(req.body);
  const request = `${req.body.streetAddress} ${req.body.postalCode} ${req.body.province} ${req.body.country}`;
  const splitRequest = request.split(' ');
  let address = '';

  for (let i = 0; i < splitRequest.length; i++) {
    if (i === splitRequest.length - 1) {
      address += `${splitRequest[i]}`;  
    } else {
      address += `${splitRequest[i]}%20`;
    }
  }

  console.log(address);

  const requestOptions = {
    method: 'GET',
  };

  const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.API_KEY_ADR}`, 
    requestOptions
  )
    .then(response => {
      if (response) {
        return JSON.stringify({ "validate_address": true });
      } else {
        return JSON.stringify({ "validate_address": false });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });

  if (response.ok) {
    // Order.update(result, {
    //   where: {

    //   }
    // })
  } else {
    res.status(404).end();
  }
});

module.exports = router;
