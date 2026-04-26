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

        if (!name) {
            return res.status(400).json({ error: "Name of item is required!"});
        }
        const[result] = await db.query (
            "INSERT INTO item (name, household_id, quantity, note) VALUES (?,?,?,?)",
            [name, household_id, quantity || null, note || null]
        );
        res.status(201).json({ message: "Item added!", insertId: result.insertId});  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const household_id = req.session.user.household_id;
        const [result] = await db.query(
            "DELETE FROM item WHERE id = ? AND household_id = ?",
            [id, household_id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json( {error: "Item not found!"})
        }
        res.status(200).json({message: "Item deleted"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.patch("/:id", async (req,res) => {
    try {

    } catch (error) {
        
    }
})

export default router;

