import { Router } from 'express';
import tokenVerifier from '../middleware/tokenVerifier.js';

import { login, register, getData } from '../Controllers/userControllers.js';

const router = Router();

// ✅ POST request to create an item
router.post('/login', login);

router.post("/register", register);

router.get("/data", tokenVerifier, getData);

export default router;
