// MIDDLEWARE
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session');
// APP STANDARDS
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); // Enables req.body parse from POST request
// DATABASE
mongoose.connect('mongodb://localhost/auth_demo');
// MODELS
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
    secret: 'ate a pe nos iremos, para o que der e vier',
    resave: false,
    saveUninitialized: false
}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
//ROUTES
app.get('/', (req, res) => {
    User.find({},(err, users) => {
        if(err){
            console.log(err);
            res.render('home');
        }else{
            console.log(users);
            res.render('home',{users:users});
        }
    });
});
app.get('/secret', (req, res) => {
    res.render('secret');
});
// - REGISTER
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.register(new User({username: username}), password, (err, user) => {
        if (err){
            console.log(err);
        } else{
            console.log('User created successfully!');
            console.log(user);
            passport.authenticate('local')
            (req, res, function(){
                console.log('Authentication successful');
                res.redirect('secret');
            });
        }
    });
});
// - LOGIN
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login',
    //MIDDLEWARE
    passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), 
    //CALLBACK
    (req, res) => {
    // EMPTY
});




// SERVER START
app.listen(3000, () => {
    console.clear();
    console.log('Auth server started!');
});