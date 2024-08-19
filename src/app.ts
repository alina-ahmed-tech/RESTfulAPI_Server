import express from "express";
import { AppDataSource } from "./database";
import { User } from "./entity/User";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

//solve CORS
app.use(cors());

// Routes
app.get("/users", async (req, res) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
});

app.post("/users", async (req, res) => {
    const user = await AppDataSource.getRepository(User).save(req.body);
    res.json(user);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
