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

export default router;