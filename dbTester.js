var mongoose = require('mongoose');

// Url connection to the MongoDB and puppies db
// If you did not mention the db name will create schema(collection, table) under test db
mongoose.connect('mongodb://localhost/puppies', {
    useNewUrlParser: true
});

// Schema allows you to define the shape and content of documents
// And embedded documents in a collection
// Blueprint to define our model and how our data looks like
var todoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
});

// Collection in Mongo DB is a group of documents

// Model JavaScript representation
// we will use inside the API To access the document which in Mongo DB
// Model in Javascript = document in Mongo DB
var todo = mongoose.model('todo', todoSchema);

// Create new row and insert into todo document in Mongo DB
// then print the output
todo.create({
    name: 'clean up your room!!',
    completed: false
}).then((err, todo) => {
    console.log(err, todo);
    process.exit();
});
