const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id ? new ObjectId(id) : null;
    };

    save() {
        const db = getDb();
        return db.collection('user')
            .insertOne(this)
            .then(result => {console.log(result);})
            .catch(err => console.log(err));
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({_id: new ObjectId(userId)})
            .then(user => {
                // console.log(user);
                return user
            })
            .catch(err => console.log(err));
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQantity = 1;
        const updatedCartItems = [...this.cart.items];
        
        if(cartProductIndex >= 0){
            newQantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQantity;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQantity});
        }
        
        const updatedCart = {items: updatedCartItems};
        const db = getDb();
        
        return db.collection('users')
            .updateOne(
                {_id: new ObjectId(this._id)},
                {$set: {cart: updatedCart}}
            );
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db
            .collection('products')
            .find({_id: {$in: productIds}})
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p, 
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()  
                        }).quantity
                    };
                });
            })
            .catch(err => console.log(err));
    }

    deleteFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(cp => {
            return cp.productId.toString() !== productId.toString();
        });;
        const db = getDb();
        return db.collection('users')
            .updateOne(
                {_id: new ObjectId(this._id)},
                {$set: {cart: {items: updatedCartItems}}}
            );
    }

    addOrder() {
        const db = getDb();
        return db.collection('orders')
            .insertOne(this.cart)
            .then(result => {
                this.cart = {items: []};
                return db.collection('users')
                .updateOne(
                    {_id: new ObjectId(this._id)},
                    {$set: {cart: this.cart}}
                );
            })
            .catch(err => {console.log(err)});
    }

    getOrders() {
        const db = getDb();

        return db.collection('orders')
            .find()
            .toArray()
            .then(orders => {
                console.log("from user model",orders);
                return orders;
            })
            .catch(err => {console.log(err)});
    }
};

module.exports = User;
