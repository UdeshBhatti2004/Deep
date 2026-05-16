import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// DATABASE CONNECTION
connectDB();


// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server Running");
});

app.use("/api/jobs", jobRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});