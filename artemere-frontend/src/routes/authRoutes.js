const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const User = require('../models/User'); // Assuming you have a User model

const router = express.Router();

// Web2 Login (Email/Password)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
});

// Web3 Login (MetaMask)
router.post('/web3-login', async (req, res) => {
    const { address, signature } = req.body;

    const message = 'Please sign this message to authenticate with Artemere.';

    try {
        const signerAddress = ethers.utils.verifyMessage(message, signature);
        if (signerAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ message: 'Invalid signature' });
        }

        let user = await User.findOne({ walletAddress: address });
        if (!user) {
            user = new User({ walletAddress: address });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate' });
    }
});

module.exports = router;
