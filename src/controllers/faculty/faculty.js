/* ********************************
 * Faculty Controller
 * Unit 1, Basic Building Blocks
 ********************************* */

// Import faculty model functions
import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyController = {};

/* ********************************
 * Build faculty list page
 ********************************* */
facultyController.facultyListPage = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'department';
        const facultyList = getSortedFaculty(sortBy);
        const title = 'Faculty Directory';
        
        res.render('faculty/list', { 
            title, 
            facultyList,
            sortBy
        });
    } catch (error) {
        console.error('Error loading faculty list:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Unable to load faculty list'
        });
    }
};

/* ********************************
 * Build faculty detail page
 ********************************* */
facultyController.facultyDetailPage = async (req, res) => {
    try {
        const facultyId = req.params.facultyId;
        const facultyMember = getFacultyById(facultyId);
        
        // Handle invalid faculty ID
        if (!facultyMember) {
            return res.status(404).render('error', {
                title: 'Faculty Not Found',
                message: `No faculty member found with ID: ${facultyId}`
            });
        }
        
        const title = facultyMember.name;
        
        res.render('faculty/detail', {
            title,
            faculty: facultyMember
        });
    } catch (error) {
        console.error('Error loading faculty detail:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Unable to load faculty details'
        });
    }
};

export { facultyController };
