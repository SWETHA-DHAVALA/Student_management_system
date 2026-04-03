const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= MongoDB Connection ================= */

mongoose.connect("mongodb://127.0.0.1:27017/student_management")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ================= Schema ================= */

const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    section: String,
    department: String,
    yearOfStudy: String,
    fatherName: String,
    motherName: String,
    studentPhone: String,
    parentPhone: String,
    password: String
});

const Student = mongoose.model("Student", studentSchema);

/* ================= APIs ================= */

// Test API
app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

// Register API
app.post("/register", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.json({ message: "Student Registered Successfully" });

    } catch (err) {
        console.log(err);
        res.json({ message: "Registration Failed" });
    }
});

// Login API
app.post("/login", async (req, res) => {

    const { rollNumber, password } = req.body;

    try {
        const student = await Student.findOne({
            rollNumber: rollNumber,
            password: password
        });

        if (student) {
            res.json({ success: true, student });
        } else {
            res.json({ success: false });
        }

    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

/* ================= Server ================= */

app.listen(3000, () => {
    console.log("Server running on port 3000");
});