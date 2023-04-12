const mongoose = require('mongoose');

const capteurSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    valeurs: [{
        valeur: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    }],
    pot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pot',
        required: true,
    },
});

const Capteur = mongoose.model('Capteur', capteurSchema);

module.exports = Capteur;
