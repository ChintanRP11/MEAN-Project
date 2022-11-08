const db = require('../util/database');

const Cart = require('./cart');

const products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute(
            'INSERT INTO products-SQL (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );
    }

    static fetchAll(cb) {
        return db.execute('SELECT * FROM products-SQL');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products-SQL WHERE products.id = ?', [id]);
    }

    static deleteById(id) {
        
    }
}