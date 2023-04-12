const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./database/db');
const errorHandler = require('./middleware/errorHandler');
const potsRoutes  = require('./routes/pots');
const capteursRoutes = require('./routes/capteurs');

// Initialisation de l'application Express
const app = express();

const expressSwagger = require('express-swagger-generator')(app);

// Configuration du port d'écoute
const port = process.env.PORT || 3000;

// Configuration de l'analyseur de corps pour la récupération de données JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

// Configuration des routes
app.use('/pots', potsRoutes);
app.use('/capteurs', capteursRoutes);

// Configuration de Swagger
const options = {
    swaggerDefinition: {
        info: {
            title: 'FlowerPot API',
            version: '1.0.0',
            description: 'API de gestion des pots de fleurs'
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname,
    files: ['./routes/*.js']
};

expressSwagger(options);

// Gestion des erreurs
app.use(errorHandler);

// Lancement du serveur
app.listen(port, () => console.log('Le serveur est lancé sur le port 3000'));