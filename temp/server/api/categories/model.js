var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config');

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
