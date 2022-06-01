const router = require("express").Router();
const fetch = require('node-fetch');

require('dotenv').config();

router.post('/', async (req, res) => {
    console.log(req.body);
    const response = await fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/USD`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': process.env.API_HOST_CUR,
            'X-RapidAPI-Key': process.env.API_KEY_CUR
        }
    })
        .then(res => res.json())
        .then(res => {
            const getRate = `res.rates.${req.body.prefer_cur}`;
            req.session.rate = eval(getRate);
            
            return 'success';
            
            // const cnvPrice = price * rate;
            // return `${cnvPrice} ${curTo}`;
        })
        .catch(err => {
            console.log(err);
        });

    if (response === 'success') {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

module.exports = router;
