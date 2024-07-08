const express = require('express');

const router = express.Router();

const {getall, create, update, remove, getbyid, imageupload } = require('../Controllers/Controller')

router.get('/getall',getall)
router.post('/create',create)
router.post('/update/:id',update)
router.post('/remove/:id',remove)
router.get('/getbyid/:id',getbyid)
router.post('/imageupload',imageupload)

module.exports = router;