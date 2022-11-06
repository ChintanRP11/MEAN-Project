const { fetchAll } = require('../models/product');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll( products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
      });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
      });
    });
}

exports.getCart = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Your Cart',
            path: '/cart'
      });
    });
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/orders', {
            prods: products,
            pageTitle: 'Your Orders',
            path: '/orders'
      });
    });
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Checkout',
            path: '/checkout',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
      });
    });
}