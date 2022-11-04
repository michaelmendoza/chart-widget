const Entity = require('../models/entity');

const find = async (req, res) => {
    try {
        const entity = await Entity.find(req.body, null);
        return res.status(200).json({ success: true, message: 'Entity query complete.', data: entity });
    }
    catch(error) {
        return res.status(400).send({ success: false, error: error.message, message:'Entity not found.'});
    }
}

const findByFeedName = async (req, res) => {
    try {
        const entity = await Entity.find({ name:req.params.feedName});
        return res.status(200).json({ success: true, message: 'Entity query complete.', data: entity });
    }
    catch(error) {
        return res.status(400).send({ success: false, error: error.message, message:'Entity not found.'});
    }
}

const clear = (req, res) => {
    console.log('Clear');

    Entity.deleteMany()
    .then(() => { 
        console.log("Data deleted"); 
        return res.status(200).json({ success: true, message: 'Data deleted'})
    }).catch((error) => { 
        console.log(error); 
        res.status(400).json('Error: ' + error)
    }); 
}

module.exports = {
    find,
    findByFeedName,
    clear
}