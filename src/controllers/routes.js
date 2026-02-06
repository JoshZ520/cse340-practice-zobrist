import { Router } from 'express';
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';
import { catalogPage, courseDetailPage } from './catalog/catalog.js';
import { facultyController } from './faculty/faculty.js';
import { addDemoHeaders } from '../middleware/demo/headers.js';

// Create a new router instance
const router = Router();

// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:courseId', courseDetailPage);

// Faculty routes
router.get('/faculty', facultyController.facultyListPage);
router.get('/faculty/:facultyId', facultyController.facultyDetailPage);

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;