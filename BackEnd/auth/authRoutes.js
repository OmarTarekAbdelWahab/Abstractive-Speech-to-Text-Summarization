import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { UnauthorizedError } from "../Errors/errors.js";

const router = express.Router();

const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
});

router.post("/google", async (req, res, next) => {
    const { credential: idToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("Payload:", payload);

        let user = await User.findOne({ googleId: payload.sub });
        
        if (!user) {
            user = new User({
                googleId: payload.sub,
                username: payload.name,
                email: payload.email,
            });
            await user.save();
        }

        user.incrementLoginCount();

        const token = user.generateAuthToken();

        res.status(200).json({ 
            message: "Login successful", 
            status: 1,
            token,
            user: { 
                name: user.username, 
                email: user.email, 
                loginCount: user.loginCount,
                createdAt: user.createdAt,
            }, 
        });
    } catch (error) {
        console.error("Error verifying token:", error);
        next(new UnauthorizedError("Authentication failed"));
    }
});
export default router;
