import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors module
import dotenv from 'dotenv'; // Import dotenv module
import Book from './models.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.mongoLink);

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors()); // Use cors middleware

// Default route
app.get('/', (req, res) => {
    res.redirect('/home.html');
});

app.post('/', (req, res) => {
    // Access the data from the request body
    const data = req.body;

    // Send a response back to the client
    res.json({ message: 'Data received successfully' });
});

app.post('/books', (req, res) => {
    // Access the data from the request body
    console.log(req.body);
    const { title, image, author } = req.body;

    // Create a new book object
    const newBook = new Book({
        title,
        image,
        author
    });

    // Save the new book to the database
    newBook.save()
        .then(() => {
            res.status(201).json({ message: 'Book created successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create book' });
        });
});

// New GET request to retrieve all books
app.get('/books', (req, res) => {
    Book.find()
        .then((books) => {
            res.json(books);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to retrieve books' });
        });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    Book.findByIdAndDelete(bookId)
        .then(() => {
            res.json({ message: 'Book deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to delete book' });
        });
});

app.get('*', function (req, res) {
    res.redirect('/404.html')
})

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
