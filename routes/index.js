const express = require('express');
const router = express.Router();

// Import individual route modules
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes')
// const authRoutes = require('./auth.routes'); // optional if separated
// const otherRoutes = require('./other.routes'); // add as needed
// Mount routes under a base path
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
// router.use('/auth', authRoutes); // only if you separate it

module.exports = router;
