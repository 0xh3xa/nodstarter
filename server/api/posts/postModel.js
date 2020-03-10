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

var postModel = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }]

});

module.exports = mongoose.model('post', postModel);
