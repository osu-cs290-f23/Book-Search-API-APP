const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'; // Update with your MongoDB connection string
const dbName = 'bookstore'; // Update with your database name
const collectionName = 'books'; // Update with your collection name

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let db; // MongoDB database connection

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    db = client.db(dbName);
});

// Define a route to handle book searches
app.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.query.toLowerCase();

        // Use MongoDB to find books based on the search term
        const results = await db.collection(collectionName)
            .find({ title: { $regex: searchTerm, $options: 'i' } })
            .toArray();

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on Port 3000");
});
