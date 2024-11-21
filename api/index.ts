import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

// Products data
const products = [
    { id: 1, name: 'Apple', price: 1.5, category: 'Fruit' },
    { id: 2, name: 'Milk', price: 2.0, category: 'Dairy' },
    { id: 3, name: 'Bread', price: 1.2, category: 'Bakery' },
    { id: 4, name: 'Carrot', price: 0.9, category: 'Vegetable' },
];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Products route
app.get('/products', (req, res) => {
    res.json(products);
});

// Export the app as a handler
export default (req: VercelRequest, res: VercelResponse) => {
    app(req, res); // Vercel maps this function to the `/api/` route
};
