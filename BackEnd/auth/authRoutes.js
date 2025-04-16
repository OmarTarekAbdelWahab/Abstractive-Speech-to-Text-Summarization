import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const router = express.Router();

const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
});

router.post("/google", async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("Payload:", payload);

        let user = await User.findOne({ googleId: payload.sub });
        
        if (!user) {
            user = new User({
                googleId: payload.sub,
                user_name: payload.name,
                email: payload.email,
            });
            await user.save();
        }

        user.incrementLoginCount();

        const retToken = await user.generateAuthToken();

        res.cookie("token", retToken, { httpOnly: true, secure: false, sameSite: "strict" });
        res.status(200).json({ message: "Login successful", user: { name: user.user_name}});
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Authentication failed" });
    }
});
export default router;
