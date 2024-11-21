const express = require('express');
const app = express();

const products = [
    { id: 1, name: 'Apple', price: 1.5, category: 'Fruit' },
    { id: 2, name: 'Milk', price: 2.0, category: 'Dairy' },
    { id: 3, name: 'Bread', price: 1.2, category: 'Bakery' },
    { id: 4, name: 'Carrot', price: 0.9, category: 'Vegetable' },
];

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
