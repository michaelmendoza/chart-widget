const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Charts = require('./charts');

const ChartViewsSchema = new Schema(
    {
        accountId:  { type: String, required: true },
        charts: [Charts],
        viewSize: { type: { width: Number, height: Number }, required: false }
    },
    { timestamps: true },
)

const ChartViews = mongoose.model('chartViews', ChartViewsSchema);

module.exports = ChartViews;