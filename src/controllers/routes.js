// Import express router
import express from 'express';
const router = express.Router();

// Import controllers
import { catalogController } from './index.js';
import { facultyController } from './faculty/faculty.js';

// Define routes
router.get('/', catalogController.buildHome);
router.get('/about', catalogController.buildAbout);
router.get('/products', catalogController.buildProducts);

// Faculty routes
router.get('/faculty', facultyController.facultyListPage);
router.get('/faculty/:facultyId', facultyController.facultyDetailPage);

export default router;
