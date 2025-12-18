const Student = require('../routes/models/Student');

module.exports = getStuendents = async (req, res) => {
    const students = await Student.find();
    if(student) {
        res.status(200).json(students);
    } else {
        res.status(404).json({ error: "Unable to fetch students" });
    }
}

module.exports = createStudent = async (req, res) => {
    try {
        const { name, age, roll_no, class: className } = req.body;

        const student = await Student.create({
            name,
            age,
            roll_no,
            class: className
        });

        res.status(201).json({ message: "Student created successfully", student });
    } 
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}