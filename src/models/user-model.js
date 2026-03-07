// src/models/user-model.js
import db from './db.js';

/**
 * Check if an email already exists in the database
 */
const emailExists = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows.length > 0;
};

/**
 * Save a new user to the database
 */
const saveUser = async (name, email, hashedPassword) => {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(query, [name, email, hashedPassword]);
    return result.rows[0];
};

/**
 * Get a user by their email address
 */
const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0] || null;
};

export { emailExists, saveUser, getUserByEmail };