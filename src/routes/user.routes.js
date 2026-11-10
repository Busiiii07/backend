const express = require('express');
const router = express.Router();
const c = require('../controllers/user.controller');
const validateId = require('../middleware/validateId');
const { requireAuth, requireRole } = require('../middleware/auth');

router.use(requireAuth); // todas las rutas de usuarios exigen access token

router.post('/', requireRole('admin'), c.createUser);
router.get('/', requireRole('admin'), c.getAllUsers);
router.get('/:id', validateId, c.getUserById);
router.put('/:id', validateId, c.updateUser);
router.delete('/:id', validateId, requireRole('admin'), c.deactivateUser);

module.exports = router;