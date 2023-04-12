const mongoose = require('mongoose');

// Configuration de la connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/pot-de-fleurs-connecte', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connexion à la base de données réussie : ${connection.connection.host}`);
    } catch (err) {
        console.log(`Erreur de connexion à la base de données : ${err}`);
    }
};

module.exports = connectDB;
