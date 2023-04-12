const Capteur = require('../models/capteur');
const Pot = require('../models/pot');

// Création d'un nouveau pot avec un capteur associé
exports.createPots = async (req, res, next) => {
    try {
        // Récupération des données de la requête
        const { nom, plante, datePlantation } = req.body;

        // Création d'un nouveau pot
        const pot = new Pot({
            nom,
            plante,
            datePlantation,
        });

        // Sauvegarde du pot dans la base de données
        await pot.save();

        // Envoi de la réponse avec l'ID du pot créé
        res.status(201).json({ potId: pot._id });
    } catch (err) {
        // Transmission de l'erreur au middleware de gestion des erreurs
        return next(err);
    }
};

exports.showCapteursPots = async (req, res, next) => {
    try {
        const potId = req.params.id;
        const capteurs = await Capteur.find({ pot: potId });
        res.json(capteurs);
    } catch (error) {
        next(error);
    }
};

exports.detailPot = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pot = await Pot.findById(id).populate('capteurs');
        if (!pot) {
            return res.status(404).json({ message: "Pot non trouvé" });
        }
        res.json(pot);
    } catch (error) {
        next(error);
    }
}

exports.getPots = async (req, res, next) => {
    try {
        const pots = await Pot.find();
        res.json(pots);
    } catch (error) {
        next(error);
    }
}

exports.deletePot = async (req, res, next) => {
    try {
        const potId = req.params.id;

        // Suppression des capteurs associés au pot
        await Capteur.deleteMany({ pot: potId });

        // Suppression du pot
        const pot = await Pot.findByIdAndDelete(potId);

        // Vérification que le pot existe
        if (!pot) {
            return res.status(404).json({ message: "Pot introuvable" });
        }

        // Envoi de la réponse avec le pot supprimé
        res.json(pot);
    } catch (err) {
        // Transmission de l'erreur au middleware de gestion des erreurs
        return next(err);
    }
}
