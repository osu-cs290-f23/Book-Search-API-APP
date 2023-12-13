const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.static('public'));
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on Port 3000");
});
