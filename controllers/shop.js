const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        }).catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findOne({ where: { id: prodId } })
    Product.findById(prodId)
        .then(product => {
            console.log(product);
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        }).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {
                products: products,
                pageTitle: 'Your Cart',
                path: '/cart'
            });
        }).catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
        }).then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
    
    // let fetchedCart;
    // let newQantity = 1;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({where: {id: prodId}});
    //     }).then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         if (product) {
    //             const oldQantity = product.cartItem.quantity;
    //             newQantity = oldQantity+1;
    //             return product;
    //         }
    //         return Product.findByPk(prodId)
    //     }).then(product => {
    //         return fetchedCart.addProduct(product, { through: {quantity: newQantity} });
    //     }).then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteFromCart(prodId)
        .then(result => {
            console.log("Product removed from cart");
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postOrder= (req, res, next) => {
    let fetchedCart;
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            console.log("from controller",orders);
            res.render('shop/orders', {
                pageTitle: 'Your Orders',
                path: '/orders',
                orders: orders
          });
        })
        .catch(err => console.log(err));
};