import { Router } from 'express';

const router = Router();

// ✅ POST request to create an item
router.post('/create', (req, res, next) => {
    const { name, age } = req.body;

    // Basic validation
    if (!name || !age) {
        const error = new Error("Name and age are required");
        error.status = 400;
        return next(error); // Pass error to the error handler
    }

    // Simulate a database operation (without actual DB)
    const newUser = { id: Date.now(), name, age };

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
});

export default router;
