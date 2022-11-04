const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChartsSchema = new Schema(
    {
        name: { type: String, required: true },
        type:  { type: String, required: true },
        feedId: { type: String, required: true },
        feedName: { type: String, required: true },
        attributes: { type: [String], required: true }, 
        dataMetric: { type: String, required: true },
        historyLength: { type: Number, required: true },
    },
    { timestamps: true },
)

const Charts = mongoose.model('charts3', ChartsSchema);

module.exports = Charts;