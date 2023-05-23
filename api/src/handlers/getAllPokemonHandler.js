

const { getAllPokemon } = require('../controllers/getAllPokemon');

const getAllPokemonHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const pokemonList = await getAllPokemon(name);
    return res.status(200).json(pokemonList);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPokemonHandler };



/*
const {getAllPokemon}= require('../controllers/getAllPokemon');




const getAllPokemonHandler = async (req, res) => {
  try {
    const pokemonList = await getAllPokemon();
    return res.status(200).json(pokemonList);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPokemonHandler }; */