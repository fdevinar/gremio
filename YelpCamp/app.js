// * ENVIRONMENT * //
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static('public')); // Assets directory
app.set('view engine','ejs'); // Embedded-Javascript as default Views format
app.use(bodyParser.urlencoded({extended: true})); // Enables req.body parse from POST request

// * ROUTES * //
app.get('/', (req, res) => {
    res.render('landing');
});

// DISPLAY CAMPGROUNDS
app.get('/campgrounds', (req, res) => {
    res.render('campgrounds',{campgrounds:campgrounds});
});

// CREATE CAMPGROUND
app.post('/campgrounds', (req, res) => {
    // GETS FORM DATA
    let name = req.body.name;
    let image = req.body.image;
    // INSERTS INTO CAMPGROUNDS ARRAY AS OBJECT
    campgrounds.push({
        name: name,
        image: image
    });
    res.redirect('campgrounds');
});

// DISPLAY FORM TO CREATE CAMPGROUND
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
})

// * DATA * //

mongoose.connect('mongodb://localhost/campgrounds');

const campSchema = new mongoose.Schema({
    name: String,
    image: String
});

// CREATE MODEL
let Campground = mongoose.model("Campground", campSchema);

// CREATE NEW CAMPGROUND
// let testCampground = new Campground({
//     name: "Test2Name",
//     image: "Test2Image"
// });

// testCampground.save((err, camp) => {
//     if (err){
//         console.log('ERROR:');
//         console.log(err);    
//     }else {
//         console.log('DATA SAVED TO DB:');
//         console.log(camp);
//     }
// });

Campground.create({
    name: "createTest",
    image: "imageTest"
}, (err, camp) => {
    if (err){
        console.log(err);
    } else {
        console.log('Created success!')
        console.log(camp);
    }
});

Campground.find({}, (err, camps) => {
    if (err){
        console.log(err);
    } else {
        console.log('ALL CAMPGROUNDS:');
        console.log(camps);
    }
});




let campgrounds = [
    {
        name: 'Smoky Mountains',
        image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=30'
    },
    {
        name: 'Dark Woods',
        image: 'https://images.unsplash.com/photo-1475710534222-6165a8b45449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=30'
    },
    {
        name: 'Star Field',
        image: 'https://images.unsplash.com/photo-1486082570281-d942af5c39b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=30'
    }
];

// Start server
app.listen(3000, () => {
    console.log('YelpCamp server listening on port 3000.');
});