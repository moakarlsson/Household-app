import express from "express";
import db from "../db/connection.js";
import crypto from "crypto";
const router = express.Router();


router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const invite_code = crypto.randomBytes(4).toString("hex");
        const [result] = await db.query("INSERT INTO household (name, invite_code) VALUES (?,?)", [name, invite_code]);
        res.status(201).json({
            message: "Household created!",
            insertId: result.insertId, invite_code
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;