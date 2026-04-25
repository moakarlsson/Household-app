import express from "express";
import db from "../db/connection.js";
import bcrypt from "bcrypt";
const router = express.Router();
const costFactor = 12;

//Remember to code a random login-code
//Create a user
router.post("/", async (req,res) => {
    const { name, password, invite_code } = req.body;
    try {
        //Hitta rätt hushåll
        const [households] = await db.query (
            "SELECT id FROM household WHERE invite_code = ?",
            [invite_code]
        );
        if (households.length === 0) {
            return res.status(404).json( {error: "Invalid code!"})
        }
        const household_id = households[0].id;

        //Skapa användare
        const hashedPassword = await bcrypt.hash(password, costFactor);
        const [result] = await db.query (
            "INSERT INTO user (name, password, household_id) VALUES (?,?,?) ",
            [name, hashedPassword, household_id]
        );

        res.status(201).json( {message: "User created", insertId: result.insertId})

    } catch(error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json( {error: "Username already taken!"})
        }
        res.status(500).json( { error: error.message });
    }
});
// Log in a user
router.post("/login", async (req,res) => {

})
//Log out a user
router.post("/logout", async (req,res) => {

})

export default router;

