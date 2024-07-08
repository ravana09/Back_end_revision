const express = require('express');

const router = express.Router();

router.use('/api', require('./Routes/routes'));
// router.use('/node',require('./Routes/sampleroutes'))

module.exports = router;