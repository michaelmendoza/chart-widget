const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema(
    {
        name: { type: String, required: true },
        attr: { type: [String], required: true},
    }
)

const Feed = mongoose.model('feed', FeedSchema);

module.exports = Feed;