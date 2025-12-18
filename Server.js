// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET' && req.url === '/') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: "Hello" }));
//     }
//     else if (req.method === 'GET' && req.url === '/about') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: "About" }));
//     }
//     else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: "Not Found" }));
//     }
// });

// server.listen(3000, () => {
//     console.log('Server running at http://localhost:3000/');
// });


// const products = [
//         {
//             id: 1,
//             name: "Product 1",
//             price: 100,
//             image: "img1"
//         },
//         {
//             id: 2,
//             name: "Product 2",
//             price: 200,
//             image: "img2"
//         },
//         {
//             id: 3,
//             name: "Product 3",
//             price: 300,
//             image: "img3"
//         }
//     ]
require('dotenv').config();
const express = require("express");
const app = express();
const fs = require("fs");
const productsRouter = require("./routes/products");
const StudentsRouter = require("./routes/students");
const createDB = require("./config/db");
const authRouter = require("./routes/auth");
const authmiddleware = require("./middlewares/authmiddleware");
const User = require("./routes/models/user");
createDB();
// const cors = require("cors")
// process - process betweent the req and res
// Anything inside app.use() is middleware

app.use(express.json());  

app.use((req,res,next) => {
    next(); // pass to next middleware/route
});

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "Hello Express" });
});

app.get("/about", (req, res) => {
    res.json({ message: "About" });
});


// // GET all products from products.json
// app.get("/products", (req, res) => {
//     const data = fs.readFileSync("products.json", "utf8");
//     const products = JSON.parse(data);
//     res.json(products);
// });

// // GET product by ID
// app.get("/products/:id", (req, res) => {
//     const data = fs.readFileSync("products.json", "utf8");
//     const products = JSON.parse(data);

//     const product = products.find(p => p.id === parseInt(req.params.id));

//     if (product) {
//         res.json(product);
//     } else {
//         res.status(404).json({ error: "Product not found" });
//     }
// });

// // DELETE product
// app.delete("/products/:id", (req, res) => {
//     const data = fs.readFileSync("products.json", "utf8");
//     const products = JSON.parse(data);

//     const updatedProducts = products.filter(p => p.id !== parseInt(req.params.id));

//     fs.writeFileSync("products.json", JSON.stringify(updatedProducts, null, 2));

//     res.status(200).json({ message: "Product deleted successfully" });
// });

// // POST product
// app.post("/products", (req, res) => {
//     const products = JSON.parse(fs.readFileSync("products.json", "utf8"));

//     const newProduct = {
//         id: products[products.length - 1].id + 1,  // <-- FIXED comma
//         name: req.body.name,
//         price: req.body.price,
//         image: req.body.image
//     };

//     const updatedProducts = [...products, newProduct];

//     fs.writeFileSync("products.json", JSON.stringify(updatedProducts, null, 2));

//     res.status(201).json({ message: "Product created successfully", product: newProduct });
// });
app.use("/products",productsRouter);
app.use("/students",StudentsRouter);
app.use("/auth",authRouter);
app.get("/profile", authmiddleware, async (req,res) => {
    const user = await User.findById(req.userData.id).select('-password');
    res.status(200).json({ message: "Profile", userData: user });
});



// app.use("/blogs",blogsRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

