const fetch = require('node-fetch');

module.exports = {
    cur_convert: (price, curFrom, curTo) => {
        fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/${curFrom}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': process.env.API_HOST_CUR,
                'X-RapidAPI-Key': process.env.API_KEY_CUR
            }
        })
            .then(res => res.json())
            .then(res => {
                const getRate = `res.rates.${curTo}`;
                const rate = eval(getRate);
                
                const cnvPrice = price * rate;
                return `${cnvPrice} ${curTo}`;
            })
            .catch(err => {
                console.log(err);
            });
    }
}
