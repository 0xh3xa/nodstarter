// Import Mongoose ORM for Mongo DB
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Import config
var config = require('../../config/config');

// Connect to Mongo DB
mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

var categoryModel = new Schema({
    category: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('category', categoryModel);
