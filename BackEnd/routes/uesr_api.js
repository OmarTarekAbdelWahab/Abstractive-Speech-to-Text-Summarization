import { Router } from 'express';
import tokenVerifier from '../middleware/tokenVerifier.js';

import { login, register, getUserData, uploadAudio, addMessage, getMessages, getChatHistory, saveEditMessage, promptMessage } from '../Controllers/userControllers.js';

const router = Router();

// ✅ POST request to create an item
router.post('/login', login);

router.post("/register", register);

router.get("/data", tokenVerifier, getUserData);

router.post("/uploadAudio", tokenVerifier, uploadAudio);

router.post("/addMessage", tokenVerifier, addMessage);

router.get("/getMessages/:audioId", tokenVerifier, getMessages);

router.get("/getChatHistory", tokenVerifier, getChatHistory);

router.post("/saveEditMessage", tokenVerifier, saveEditMessage);

router.post("/promptMessage", tokenVerifier, promptMessage);

export default router;