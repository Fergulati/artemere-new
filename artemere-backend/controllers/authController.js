const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ethers } = require('ethers');
const User = require('../models/User');

// Web2 login (email/password)
exports.web2Login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
};

// Web3 login (wallet address)
exports.web3Login = async (req, res) => {
    const { address, signature } = req.body;

    const message = 'Please sign this message to authenticate with Artemere.';

    try {
        const signerAddress = ethers.utils.verifyMessage(message, signature);
        if (signerAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ message: 'Invalid signature' });
        }

        let user = await User.findOne({ walletAddress: address });
        if (!user) {
            user = new User({ walletAddress: address, role: 'breeder' }); // Default role for web3 users
            await user.save();
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate' });
    }
};
