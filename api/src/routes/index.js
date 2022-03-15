const { Router } = require('express');
const pokemonRoute = require("./Pokemon")
const typeRoute = require("./Type")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonRoute)
router.use("/types", typeRoute)


module.exports = router;
