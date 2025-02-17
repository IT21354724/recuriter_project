const Admin = require("../Model/AdminLoginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if admin already exists
        let adminExists = await Admin.findOne({ email });
        if (adminExists) return res.status(400).json({ message: "Admin already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, email: admin.email }, "secretKey", { expiresIn: "1h" });

        res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerAdmin, loginAdmin };
