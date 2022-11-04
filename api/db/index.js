const mongoose = require('mongoose');
const { initMockData } = require('../mock');

let db;

const initDB = async (database_name) => {
    const database = database_name || process.env.DB_NAME || 'chart-widget';
    const host = process.env.DB_HOST || 'mongodb://127.0.0.1:27017/';

    await mongoose
        .connect(host + database, { useNewUrlParser: true })
        .catch(e => { console.error('Connection error', e.message)})

    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
    db = mongoose.connection;
    
    return mongoose.connection;
}

const getDB = () => db;

const setupMock = async (app) => {
    await initMockData(app);
}

const dropAllCollections = async () => {
    const collections = await db.db.listCollections().toArray();

    for(var i = 0; i < collections.length; i++) {
        await db.db.dropCollection(collections[i].name);
    }
}

module.exports = { 
    initDB,
    getDB,
    setupMock,
    dropAllCollections
}