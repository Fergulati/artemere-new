const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, sparse: true }, // Optional for Web3 users
    password: { type: String }, // Optional for Web3 users
    walletAddress: { type: String, unique: true, sparse: true }, // For Web3 users
});

const User = mongoose.model('User', userSchema);

module.exports = User;
