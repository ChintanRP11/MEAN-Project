// const getDb = require('../util/database').getDb;
const mongoose = require('mongoose');
const { STRING } = require('sequelize');
const product = require('./product');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }, 
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQantity = 1;
    const updatedCartItems = [...this.cart.items];
    
    if(cartProductIndex >= 0){
        newQantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQantity;
    } else {
        updatedCartItems.push({ productId: product._id, quantity: newQantity});
    }
    
    const updatedCart = {items: updatedCartItems};
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(cp => {
        return cp.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function() {
    const updatedCartItems = []
    this.cart.items = updatedCartItems;
    return this.save();
}




module.exports = mongoose.model('User', userSchema);