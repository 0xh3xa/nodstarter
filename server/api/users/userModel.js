// Import Mongoose ORM for Mongo DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
// Import config
var config = require('../../config/config');

var logger = require('../../util/logger');

// Connect to Mongo DB
logger.log('config db url: ' + config.db.url);
mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Define our scehma
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware that will run before a document is created
// Anytime before create new user this function will run
// Encrypt the plain password text to encrypted password
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    // check the password on sign in
    authenticate: function (plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    },

    encryptPassword: function (plainPassword) {
        if (!plainPassword) {
            return '';
        } else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainPassword, salt);
        }
    },

    toJson: function () {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
};

// create model user with user schema
module.exports = mongoose.model('user', UserSchema);
