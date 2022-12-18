const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodeprojecttest0@gmail.com',
      pass: 'oyrewnqiwpoqtvwk'
    }
  });

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: message
    });
};


exports.postLogin = (req,res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }
        bcrypt
        .compare(password, user.password)
        .then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        })
    })
    .catch(err => console.log(err));
}

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0){
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        pageTitle: 'Signup',
        path: '/signup',
        errorMessage: message
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email: email})
    .then( userDoc => {
        if (userDoc) {
            req.flash('error', 'Account with this E-mail already exists, Please pick a different one.');
            return res.redirect('/signup');
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {

            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return user.save();
        }).then(result => {
            res.redirect('/login');
            const mailOptions = {
                to: email,
                from: 'nodeprojecttest0@gmail.com',
                subject: 'Signup Completed',
                html: '<h1>Shop NodeJS</h1></br><h2>You are successfully signed up!</h2>'
            }
            return transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }).catch(err => {console.log(err)});
    }).catch(err => {console.log(err)});
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};