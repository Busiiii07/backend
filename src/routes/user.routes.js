const express = require('express');
const router = express.Router();
const c = require('../controllers/user.controller');
const validateId = require('../middleware/validateId');

router.post('/', c.createUser);
router.get('/', c.getAllUsers);
router.get('/:id', validateId, c.getUserById);
router.put('/:id', validateId, c.updateUser);
router.delete('/:id', validateId, c.deactivateUser);

module.exports = router;