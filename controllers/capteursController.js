const Capteur = require('../models/capteur');
const Pot = require('../models/pot');

// Fonction de création d'un nouveau capteur associé à un pot existant
exports.createCapteur = async (req, res, next) => {
    try {
        // Récupération des données de la requête
        const { typeCapteur, valeur, dateCapteur } = req.body;
        const { potId } = req.params;

        // Recherche du pot associé au capteur
        const pot = await Pot.findById(potId);
        if (!pot) {
            return res.status(404).json({ message: "Le pot n'a pas été trouvé." });
        }

        // Vérification que le capteur n'existe pas déjà pour ce pot
        const existingCapteur = await Capteur.findOne({ pot: pot._id, type: typeCapteur });
        if (existingCapteur) {
            existingCapteur.valeurs.push({
                valeur,
                date: dateCapteur,
            });
            await existingCapteur.save();
            return res.json({ capteur: existingCapteur });
        }

        // Création d'un nouveau capteur associé au pot
        const capteur = new Capteur({
            type: typeCapteur,
            pot: pot._id,
            valeurs: [
                {
                    valeur,
                    date: dateCapteur,
                },
            ],
        });

        // Sauvegarde du capteur dans la base de données
        await capteur.save();

        // Ajout du capteur à la liste des capteurs associés au pot
        pot.capteurs.push(capteur._id);

        // Sauvegarde des modifications du pot dans la base de données
        await pot.save();

        // Envoi de la réponse avec le capteur créé
        res.status(201).json({ capteur });
    } catch (err) {
        // Transmission de l'erreur au middleware de gestion des erreurs
        return next(err);
    }
};

// Fonction de récupération de l'historique des capteurs associés à un pot
exports.getCapteursByPot = async (req, res, next) => {
    try {
        const { potId } = req.params;

        // Recherche du pot associé aux capteurs
        const pot = await Pot.findById(potId);
        if (!pot) {
            return res.status(404).json({ message: "Le pot n'a pas été trouvé." });
        }

        // Récupération des capteurs associés au pot avec leur historique
        const capteurs = await Capteur.find({ pot: pot._id }).populate('pot', 'nom');

        // Envoi de la réponse avec les capteurs et leur historique
        res.json(capteurs);
    } catch (err) {
        // Transmission de l'erreur au middleware de gestion des erreurs
        return next(err);
    }
};

// Suppression d'un capteur
exports.deleteCapteur = async (req, res) => {
    try {
        const capteur = await Capteur.findById(req.params.id);
        if (!capteur) {
            return res.status(404).json({ message: 'Capteur non trouvé' });
        }
        await Capteur.findByIdAndDelete(req.params.id);
        res.json({ message: 'Capteur supprimé' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

