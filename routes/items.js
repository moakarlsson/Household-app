import express from "express";
import db from "../db/connection.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { household_id } = req.query;
        const [rows] = await db.query("SELECT * FROM item WHERE household_id = ?", [household_id]);
        if(rows.length === 0) {
            return res.status(404).json({error: "No household found!"});
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json( {error: err.message });
    }
});

router.post("/add", async (req,res) => {
    try {
        const { name, quantity, note } = req.body;
        const household_id = req.session.user.household_id;
        const[result] = await db.query (
            "INSERT INTO item (name, household_id) VALUES (?,?)",
            [name, household_id]
        );
        res.status(201).json({ message: "Item added!", insertId: result.insertId});  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

/*CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    checked BOOLEAN DEFAULT FALSE,
    household_id INT NOT NULL,
    FOREIGN KEY (household_id) REFERENCES household(id)
);*/