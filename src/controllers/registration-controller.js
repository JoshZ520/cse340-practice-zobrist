// src/controllers/registration-controller.js
import { emailExists, saveUser } from '../models/user-model.js';

const processRegistration = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    const exists = await emailExists(email);
    if (exists) {
        return res.redirect('/register');
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await saveUser(name, email, hashedPassword);

    // Redirect to success page
    res.redirect('/users');
};