const router = require('express').Router();

// Routes
router.use('/record', require('./record'));

module.exports = router;
