const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    plante: {
        type: String,
        required: true,
    },
    datePlantation: {
        type: Date,
        required: true,
    },
    capteurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Capteur',
    }],
});

const Pot = mongoose.model('Pot', potSchema);

module.exports = Pot;
