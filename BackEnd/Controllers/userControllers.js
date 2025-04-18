import { BadRequestError } from '../Errors/errors.js';
import User from '../models/User.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("Email and password are required!");
        }
    
        const user = await User.findOne({ email: email });
        if (!user) {
            // email not found
            throw new BadRequestError("Please enter a valid email!");
        }
    
        if (user.googleId && !user.password) {
            throw new ForbiddenError("You signed up with Google. Use Google login instead!");
        }
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new BadRequestError("Please enter a valid password!");
        }
    
        const token = user.generateAuthToken();
        
        // Increments the login count for the user
        user.incrementLoginCount();
    
        
        return res.json({ 
            message: "Login Success", 
            status: 1, 
            token, 
            user: {
                username: user.username,
                email: user.email,
                loginCount: user.loginCount,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        if (!email || !password || !username) {
            throw new BadRequestError("Email, password, and user name are required!");
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate authentication token
        const token = newUser.generateAuthToken();

        newUser.incrementLoginCount();

        // Set authentication cookie

        return res.status(201).json({ 
            message: "Registration successful", 
            status: 1, token, 
            user: {
                username: newUser.username,
                email: newUser.email,
                loginCount: newUser.loginCount,
                createdAt: newUser.createdAt,
            }
        });
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

export const getUserData = async (req, res, next) => {
    try {
        console.log("here at /data..");
        const user = {
            username: req.user.username,
            email: req.user.email,
            loginCount: req.user.loginCount,
            createdAt: req.user.createdAt,
        }
        
        return res.status(200).json({ status: 1, user });
    } catch (error) {
        next(error);
    }
};