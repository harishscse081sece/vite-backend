

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Products APIs
app.get('/products', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read products' });
    }
});

app.post('/products', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8');
        const products = JSON.parse(data);
        const newProduct = { id: Date.now(), ...req.body };
        products.push(newProduct);
        fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 2));
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Cart APIs
app.get('/cart', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'cart.json'), 'utf8');
        const cart = JSON.parse(data);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read cart' });
    }
});

app.post('/cart', (req, res) => {
    try {
        const cart = req.body;
        fs.writeFileSync(path.join(__dirname, 'cart.json'), JSON.stringify(cart, null, 2));
        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
});

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
});