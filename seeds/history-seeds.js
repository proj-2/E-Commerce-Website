const History = require("../models/History")

const historyData = [

]

const seedHistory = () => History.bulkCreate(historyData);

module.exports = seedHistory