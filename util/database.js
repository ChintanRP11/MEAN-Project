const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
MongoClient.connect('mongodb+srv://chintan-mongodb:7I5VwbOKb5jMMVVi@project-mean-stack.6ifabul.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db: client.db();
        callback(client);
    })
    .catch(err => {console.log(err); throw err});
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
