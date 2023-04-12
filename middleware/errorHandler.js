// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
    // Vérification de la présence d'une erreur dans la réponse
    if (!err) {
        return next();
    }

    // Affichage de l'erreur dans la console
    console.error(err);

    // Envoi de la réponse d'erreur au client
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Erreur serveur inattendue',
    });
};

module.exports = errorHandler;
