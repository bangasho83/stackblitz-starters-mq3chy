export default function handler(req, res) {
    if (req.url === '/api/products') {
        const products = [
            { id: 1, name: 'Apple', price: 1.5, category: 'Fruit' },
            { id: 2, name: 'Milk', price: 2.0, category: 'Dairy' },
            { id: 3, name: 'Bread', price: 1.2, category: 'Bakery' },
            { id: 4, name: 'Carrot', price: 0.9, category: 'Vegetable' },
        ];
        res.status(200).json(products);
    } else {
        res.status(404).send('Not Found');
    }
}
