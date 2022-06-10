module.exports = {
    cur_convert: (price, curRate) => {
        const cnvPrice = (price * curRate) * 100;
        return `${Math.ceil(cnvPrice) / 100}`
    }
}
