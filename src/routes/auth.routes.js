const express = require('express');
const router = express.Router();
const c = require('../controllers/auth.controller');

router.post('/registro', c.register);
router.post('/login', c.login);

module.exports = router;