const express = require('express');
const { web2Login, web3Login } = require('../controllers/authController');

const router = express.Router();

// Web2 login route (email/password)
router.post('/login', web2Login);

// Web3 login route (wallet-based)
router.post('/web3-login', web3Login);

module.exports = router;
