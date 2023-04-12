const express = require('express');
const router = express.Router();

const potsController = require('../controllers/potsController');

// Création d'un nouveau pot avec un capteur associé
router.post('/', potsController.createPots);

router.get('/:id/capteurs', potsController.showCapteursPots);

router.get('/:id', potsController.detailPot);

// Récupération de la liste des pots
router.get('/', potsController.getPots);

// Suppression d'un pot et de ses capteurs
router.delete('/:id', potsController.deletePot);

module.exports = router;
