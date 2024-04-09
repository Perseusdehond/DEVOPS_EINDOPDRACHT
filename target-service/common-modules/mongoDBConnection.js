const mongoose = require('mongoose');
const mongoDBurl = process.env.MONGODB_URL || 'mongodb://mongodb:27018/targetsdevops';

function connectWithRetry() {
    return mongoose.connect(mongoDBurl)
        .then(() => {
            console.log('Connected to MongoDB at', mongoDBurl);
        })
        .catch(err => {
            console.error('Failed to connect to MongoDB on startup:', err);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

module.exports = mongoose;