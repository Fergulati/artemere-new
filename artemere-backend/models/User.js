const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, sparse: true }, // Optional for web3 users
    password: { type: String }, // Optional for web3 users
    walletAddress: { type: String, unique: true, sparse: true }, // For web3 users
    role: { type: String, enum: ['artist', 'breeder'], required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
