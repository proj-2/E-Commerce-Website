module.exports = {
    cur_convert: (price, curRate) => {
        const cnvPrice = (price * curRate) * 100;
        return `${Math.ceil(cnvPrice) / 100}`;
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} ${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`;
    }
}
