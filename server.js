require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, 
        ttl: 60 * 60 
    }),
    cookie: { maxAge: 60 * 60 * 1000 } 
}));

// Sample route
app.get('/', (req, res) => {
    res.send('Home page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
