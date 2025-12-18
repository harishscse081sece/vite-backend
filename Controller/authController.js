const users = require('../routes/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body; 
        const existingUser = await users.findOne({email});
        if(existingUser) {
            return  res.status(409).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({email, password: hashedPassword, name});
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


const loginUser = async (req, res) => {  
    try {
        const { email, password } = req.body; 
        const user = await users.findOne({email,});    
       if(!user) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
       } 
       const isPasswordValid = await bcrypt.compare(password, user.password);
       if(!isPasswordValid) {
        res.status(400).json({ error: "Invalid password" });
        return;
       }
       const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '1h'});
       res.status(200).json({message: "Login successful", token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }   
}            

module.exports = { registerUser, loginUser };