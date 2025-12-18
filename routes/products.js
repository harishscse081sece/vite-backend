const express = require("express");
const fs = require("fs")
const router = express.Router()

// GET all products from products.json
router.get("/", (req, res) => {
    const data = fs.readFileSync("products.json", "utf8");
    const products = JSON.parse(data);
    res.json(products);
});

// GET product by ID
router.get("/:id", (req, res) => {
    const data = fs.readFileSync("products.json", "utf8");
    const products = JSON.parse(data);

    const product = products.find(p => p.id === parseInt(req.params.id));

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// DELETE product
router.delete("/:id", (req, res) => {
    const data = fs.readFileSync("products.json", "utf8");
    const products = JSON.parse(data);

    const updatedProducts = products.filter(p => p.id !== parseInt(req.params.id));

    fs.writeFileSync("products.json", JSON.stringify(updatedProducts, null, 2));

    res.status(200).json({ message: "Product deleted successfully" });
});

// POST product
router.post("/", (req, res) => {
    const products = JSON.parse(fs.readFileSync("products.json", "utf8"));

    const newProduct = {
        id: products[products.length - 1].id + 1,  
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    };

    const updatedProducts = [...products, newProduct];

    fs.writeFileSync("products.json", JSON.stringify(updatedProducts, null, 2));

    res.status(201).json({ message: "Product created successfully", product: newProduct });
});

module.exports = router;
// students/
// GET - /students  -> all students 
// GET - /students/:id -> - single one student
// POST - /students -body (pass new student data)  
// PUT - /students/:id - body (pass teh updated the student data)
// DELETE - /students/:id