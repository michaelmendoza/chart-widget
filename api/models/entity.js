const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EntitySchema = new Schema(
    {
        name: { type: String, required: true },
        geo: { type: [Number], required: true },
        attr: { type: { a:Number, b:Number, c:Number, d:Number }, required: true},
        time: { type: Date, required: true },
    },
    { timestamps: true },
)

const Entity = mongoose.model('entity', EntitySchema);

module.exports = Entity;