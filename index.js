const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
