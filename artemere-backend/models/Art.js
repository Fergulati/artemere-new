const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    breedCount: { type: Number, default: 0 },
    royalties: [
        {
            artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            percentage: { type: Number, required: true },
        },
    ],
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;
