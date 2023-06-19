const { Router } = require('express');

const pokemonRouter = require('./pokemonRouter');
const typeRouter = require('./typeRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
/* const axios = require('axios');
const {Pokemon,Type} = require('../db'); */


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonRouter);
router.use('/types', typeRouter);



module.exports = router;
