import fs from "fs";
import path from "path";
import { BadRequestError } from '../Errors/errors.js';
import AudioModel from '../models/Audio.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { callFastApiModel } from '../Services/llmCaller.js';
import { convertWebmBufferToWav } from '../Utilities/convert_audio.js';


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
        console.log("New user created:", newUser);

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

export const uploadAudio = async (req, res, next) => {
    try {
        const { title, type, audio_data } = req.body;
        const userId = req.user._id;
        
        if (!title || !audio_data) {
            throw new BadRequestError("Title and audio file are required!");
        }

        // Prepare directory and file path
        const userDir = path.join("user_audios", userId.toString());
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        console.log("Type:", type.split("/")[1]);

        const fileName = `${Date.now()}_${title.split('.')[0].replace(/\s+/g, "_")}.${type.split("/")[1] || "wav"}`;
        const filePath = path.join(userDir, fileName);
        // Decode base64 and save file
        const buffer = Buffer.from(audio_data, "base64");

        if(type.split("/")[1] === "webm" || type.split("/")[1] === "" || type.split("/")[1] === "wav"){
            await convertWebmBufferToWav(buffer, filePath);
        }
        else{
            fs.writeFileSync(filePath, buffer);
        }

        // Save to DB
        const audio = new AudioModel({
            user: userId,
            title,
            type,
            audioUrl: filePath, // Save relative path
        });

        await audio.save();
        console.log("Audio saved to DB:", audio);
        console.log("Audio file saved at:", filePath);

        return res.status(201).json({ status: 1, message: "Audio uploaded successfully", audioId: audio._id });
    } catch (error) {
        next(error);
    }
};

export const addMessage = async (req, res, next) => {
    try {
        const { audioId, content, timestamp } = req.body;
        const userId = req.user._id;

        if (!content || !audioId) {
            throw new BadRequestError("Content and audio ID are required!");
        }

        // Find the audio by ID
        const audio = await AudioModel.findById(audioId);
        if (!audio) {
            throw new BadRequestError("Audio not found!");
        }

        // Create a new message
        const message = new Message({
            user: userId,
            audio: audioId,
            content,
            timestamp,
        });

        await message.save();
        console.log("Message saved to DB:", message);

        // todo
        const modelResponse = await callFastApiModel(audio.audioUrl, content);

        const botMessage = new Message({
            user: userId, // Assuming the bot uses the same user ID
            audio: audioId,
            content: modelResponse,
            timestamp: Date.now(),
            sender: "bot",
        });

        await botMessage.save();
        console.log("Bot message saved to DB:", botMessage);

        return res.status(201).json(botMessage);
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const audioId = req.params.audioId;
        const userId = req.user._id;

        // Find all messages for the user
        const messages = await Message.find({ user: userId, audio: audioId }).sort({ timestamp: 1 });
        console.log("Messages retrieved from DB:", messages);

        const returnedMessages = messages.map((message) => {
            return {
                audioId: message.audio,
                sender: message.sender,
                content: message.content,
                timestamp: message.timestamp,
            };
        });

        return res.status(200).json(returnedMessages);
    } catch (error) {
        next(error);
    }
};

export const getChatHistory = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find all audios for the user
        const audios = await AudioModel.find({ user: userId }).sort({ createdAt: -1 });
        console.log("Audios retrieved from DB:", audios);

        const chatHistory = audios.map((audio) => {
            return {
                audioId: audio._id,
                title: audio.title,
                createdAt: audio.createdAt,
            };
        });



        return res.status(200).json(chatHistory);
    } catch (error) {
        next(error);
    }
};