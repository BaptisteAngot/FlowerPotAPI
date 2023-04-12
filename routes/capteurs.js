const express = require('express');
const router = express.Router();

const capteursController = require('../controllers/capteursController');

// Route de création d'un nouveau capteur associé à un pot existant
router.post('/:potId', capteursController.createCapteur);

// Route de récupération de l'historique des capteurs associés à un pot
router.get('/:potId', capteursController.getCapteursByPot);

// Route de suppression d'un capteur
router.delete('/:id', capteursController.deleteCapteur);

module.exports = router;
