const router = require("express").Router();
const fetch = require("node-fetch");
const { User } = require("../../models");

require("dotenv").config();

router.post("/", (req, res) => {
  console.log(req.body);
  //     const response = await fetch(`https://api.geoapify.com/v1/geocode/search?`, {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Host": process.env.API_HOST_CUR,
  //     "X-RapidAPI-Key": process.env.API_KEY_CUR,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     const getRate = `res.rates.${req.body.prefer_cur}`;
  //     req.session.curRate = eval(getRate);
  //     req.session.currency = req.body.prefer_cur;
  //     return "success";
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // if (response === "success") {
  //   res.status(204).end();
  // } else {
  //   res.status(404).end();
  // }
});
module.exports = router;
