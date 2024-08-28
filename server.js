const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolioDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

// Serve static files
app.use(express.static('static'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the portfolio HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/static-portfolio.html');
});

// Handle form submission
app.get('/contact', (req, res) => {
    const newContact = new Contact({
        name: req.query.name,
        phone: req.query.phone,
        email: req.query.email
    });

    newContact.save((err) => {
        if (err) {
            res.send('There was an error saving the contact.');
        } else {
            res.send('Contact saved successfully!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
