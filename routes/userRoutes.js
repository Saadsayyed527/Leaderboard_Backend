const express = require('express');
const { getUsers, claimPoints, createUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

router.post('/create', createUsers);

router.patch('/:id/claim', claimPoints);

module.exports = router;
