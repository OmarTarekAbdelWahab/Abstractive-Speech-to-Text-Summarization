import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const token = await req.user.generateAuthToken();

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
        // res.json({ message: "Login successful", token: token });
        res.redirect("http://localhost:3000");
        // return res;
    }
);

export default router;
