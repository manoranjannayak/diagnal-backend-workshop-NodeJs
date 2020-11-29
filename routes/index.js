/**
 * This file is where we defined routes.
 * 
 * @since 1.0.0
 */
const Router = require('express');
const router = Router();

// Import controllers
const controllers = require('../controllers');

// Post method endpoint
router.post("/getMetaData",controllers.getMetaData);

module.exports = router;