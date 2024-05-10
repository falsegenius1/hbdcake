// Import required modules
const { name } = require('ejs');
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve your homepage
app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.render("index", {name:""})
});
app.get('/:name', (req, res) => {
    let name = req.params.name
    name = name.charAt(0).toUpperCase() + name.slice(1)
    res.render("index", {name})
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
