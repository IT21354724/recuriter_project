const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Link Routes
const AdminLoginRoutes = require("./Routes/AdminLoginRoutes.js");  


dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", AdminLoginRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// BT36JbGBJsCYiOPp