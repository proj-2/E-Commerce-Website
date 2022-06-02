const router = require("express").Router();
const fetch = require('node-fetch');
const { User } = require("../../models");

require('dotenv').config();

router.post('/', async (req, res) => {
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
                req.body.prefer_cur = userData.currency;
            });
    } else {
        if (req.body.prefer_cur === 'USD') {
            req.session.curRate = null;
            req.session.currency = 'USD';
    
            res.status(204).end();
        }
    }

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
