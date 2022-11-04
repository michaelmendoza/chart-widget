const Feed = require('../models/feed');

const find = async (req, res) => {
    const options = { limit: 10 };   
    try {
        const feeds = await Feed.find(req.body, null, options);
        return res.status(200).json({ success: true, message: 'Feed query complete.', data: feeds });
    }
    catch(error) {
        return res.status(400).send({ success: false, error: error.message, message:'Feed not found.'});
    }
}

const create = async (req, res) => {
    
    if(!req.body) return res.status(400).json({ success: false, error: 'Invalid request.' });
    
    try {
        const feed = new Feed({ ...req.body });
        await feed.save();

        return res.status(201).json({ success: true, message: 'Feed created.', data: feed });
    }
    catch(error) {
        return res.status(400).send({ success: false, error: error.message, message:'Feed not created.'});
    }
}

module.exports = {
    find,
    create
}