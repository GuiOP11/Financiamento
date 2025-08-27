const express = require('express');
const router = express.Router();
const { Moto } = require('../models/moto');

// Route to register a new motorcycle
router.post('/register', async (req, res) => {
  const { model, brand, year } = req.body;

  try {
    const newMoto = await Moto.create({ model, brand, year });
    res.status(201).json({ message: 'Motorcycle registered successfully', newMoto });
  } catch (error) {
    res.status(500).json({ message: 'Error registering motorcycle', error });
  }
});

// Route to get all motorcycles
router.get('/', async (req, res) => {
  try {
    const motos = await Moto.findAll();
    res.status(200).json(motos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching motorcycles', error });
  }
});

module.exports = router;