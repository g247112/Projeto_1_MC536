const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/school-system';

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB, url };