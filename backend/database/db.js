const mongoose = require('mongoose');

const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

        console.log('Database connecton success');
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;