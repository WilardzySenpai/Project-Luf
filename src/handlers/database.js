const mongoose = require('mongoose');
const { database } = require('../config/main');

module.exports = async () => {
    console.log('Started connecting to MongoDB...', 'warn');
    
    await mongoose.connect(process.env.MONGO || database.mongodb_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB is connected to the atlas!', 'done')
    }).catch((error) => {
        console.error(error);
    });
};
