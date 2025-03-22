import User from '../models/User.js';

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        // Username not found
        return res.status(401).json({ message: 'Invalid user' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        // Incorrect password
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = await user.generateAuthToken();
    
    // Increments the login count for the user
    await user.incrementLoginCount();

    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false }); // secure true to allow https only

    return res.json({ message: "Login Success", status: 1 })
};

export const register = async (req, res, next) => {
    try {
        const { user_name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create a new user
        const newUser = new User({ user_name, email, password });
        await newUser.save();

        // Generate authentication token
        const token = newUser.generateAuthToken();

        // Set authentication cookie
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false });

        return res.status(201).json({ message: "Registration successful", status: 1, user: newUser });
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

export const getData = async (req, res, next) => {
    try {
        console.log("here at /data..");
        const { email } = req.body;
        const user = await User.findOne({ email: email});

        if (!user) {
            // Username not found
            return res.status(401).json({ message: 'Invalid user' });
        }
        
        return res.status(200).json({ status: 1, user });
    } catch (error) {
        next(error);
    }
};