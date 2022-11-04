require('dotenv').config()
const { createApp } = require('./app');
const db = require('./db');

// Configurations
//console.log(process.env)
const port = process.env.PORT || 3001;

// Set up database
const doInitDB = process.env.DO_DB_INIT ?  process.env.DO_DB_INIT : true;
const setupDB = async (app) => {
    await db.initDB()
    if(doInitDB) {
        await db.dropAllCollections()
        await db.setupMock(app)
    }
}

// Create express app and listen to port
const app = createApp()
setupDB(app);
app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); })
