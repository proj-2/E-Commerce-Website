const router = require("express").Router();
const fetch = require('node-fetch');
const { User } = require("../../models");

require('dotenv').config();

// get currency rate and store it in req.session
router.post('/', async (req, res) => {
    // if the user is logged in, get user preferred currency from User data
    if (req.session.loggedIn) {
        User.findOne({
            attributes: ['id', 'currency'],
            where: {
                id: req.session.user_id
            }
        })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                // set user's preferred currency into req.body
                req.body.prefer_cur = userData.currency;
            });
    } else {
        // if the user not logged in chose USD as preferable currency,
        if (req.body.prefer_cur === 'USD') {
            // set currency rate as null and currency as USD
            req.session.curRate = null;
            req.session.currency = 'USD';
    
            // exit this function
            res.status(204).end();
        }
    }

    // get latest currency rate for USD
    const response = await fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/USD`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': process.env.API_HOST_CUR,
            'X-RapidAPI-Key': process.env.API_KEY_CUR
        }
    })
        .then(res => res.json())
        .then(res => {
            // get rate and store it in req.session
            const getRate = `res.rates.${req.body.prefer_cur}`;
            req.session.curRate = eval(getRate);
            req.session.currency = req.body.prefer_cur;
            
            return 'success';
        })
        .catch(err => {
            console.log(err);
        });

    if (response === 'success') {
        res.status(204).end();
    } else {
        res.status(404).end();
    };
});

module.exports = router;
