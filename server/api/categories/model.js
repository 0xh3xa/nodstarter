const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config');

mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const categoryModel = new Schema({
    category: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('category', categoryModel);
