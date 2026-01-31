// Import express using ESM syntax
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = process.env.NAME;
const NODE_ENV = process.env.NODE_ENV || 'production';

// Create an instance of an Express application
const app = express();

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Import routes
import routes from './src/controllers/routes.js';

// Use routes
app.use('/', routes);

// 404 Handler - Catch unhandled routes
app.use((req, res, next) => {
    res.status(404).render('error', {
        title: '404 - Page Not Found',
        message: `The page you are looking for does not exist: ${req.url}`
    });
});

// Error Handler - Must have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.status || 500;
    const message = NODE_ENV === 'development' 
        ? err.message 
        : 'An unexpected error occurred';
    
    res.status(statusCode).render('error', {
        title: `Error ${statusCode}`,
        message: message,
        error: NODE_ENV === 'development' ? err : {}
    });
});


// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});