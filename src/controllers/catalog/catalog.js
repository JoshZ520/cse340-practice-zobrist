/* ********************************
 * Catalog Controller
 * Unit 1, Basic Building Blocks
 ********************************* */

const catalogController = {};

/* ********************************
 * Build home view
 ********************************* */
catalogController.buildHome = async (req, res) => {
    const title = 'Welcome Home';
    res.render('home', { title });
};

/* ********************************
 * Build about view
 ********************************* */
catalogController.buildAbout = async (req, res) => {
    const title = 'About';
    res.render('about', { title });
};

/* ********************************
 * Build products view
 ********************************* */
catalogController.buildProducts = async (req, res) => {
    const title = 'Our Products';
    res.render('products', { title });
};

export default catalogController;
