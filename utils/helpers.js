module.exports = {
    cur_convert: (price) => {
        const curRate = 1.22;
        // const currency = Session.get('currency');
        // console.log(curRate, currency);
        return `${price * curRate}`
    }
}
