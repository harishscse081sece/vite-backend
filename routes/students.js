const express = require("express");
const Student = require("./models/Student");
const router = express.Router();
const getStudents = require("../Controller/studentsController");
const  createStudent  = require("../Controller/studentsController");

// Middleware for parsing JSON
router.use(express.json());
router.get("/", getStudents);
router.post("/",createStudent);

// router.get("/", async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.status(200).json(students);
//     } catch (err) {
//         res.status(500).json({ error: "Unable to fetch students" });
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const { name, age, roll_no, class: className } = req.body;

//         const student = await Student.create({
//             name,
//             age,
//             roll_no,
//             class: className
//         });

//         res.status(201).json({ message: "Student created successfully", student });
//     } 
//     catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

module.exports = router;