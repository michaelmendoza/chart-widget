const Feed = require("../models/feed");

const createMockFeeds = () => {

    const feeds = [
        { name: 'Lightning', attr: ['a', 'b', 'c', 'd'] },
        { name: 'Hospitals', attr:  ['a', 'b', 'c', 'd']},
        { name: 'Traffic', attr:  ['a', 'b', 'c', 'd']},
        { name: 'Population', attr:  ['a', 'b', 'c', 'd']}
    ];

    feeds.forEach(async ( value ) => {
        try {
            const feed = new Feed({ ...value });
            await feed.save();
        }
        catch(error) {
            console.log('Feed not created: ', error.message );
        }
    });
}

module.exports = {
    createMockFeeds
}