const { createMockEntities } = require("./entity");
const { createMockFeeds } = require("./feed")

const initMockData = async (app) => {

    console.log('Initializing database ...')
    await createMockFeeds();
    await createMockEntities(10000);
    console.log('Initialization complete.')

}

module.exports = {
    initMockData
}