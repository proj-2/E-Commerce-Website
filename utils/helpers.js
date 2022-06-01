module.exports = {
    cur_convert: (price, curRate) => {
        console.log(curRate);
        return `${price * curRate}`
    }
}
