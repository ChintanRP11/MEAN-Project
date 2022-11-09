const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
MongoClient.connect('mongodb+srv://chintan-mongodb:7I5VwbOKb5jMMVVi@project-mean-stack.6ifabul.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        callback(client);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;
