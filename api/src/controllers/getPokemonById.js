const axios = require('axios');
const { Pokemon, Type } = require('../db');



async function fetchPokemonData(id) {
 
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error en el intento para obtener datos de Pokémon: ${error}`);
      
    }
  

  return null;
}

function transformPokemonData(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    life: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    types: data.types.map(type => type.type.name)
  };
}

const getPokemonById = async (id) => {
  try {
    const pokemonData = await fetchPokemonData(id);

    if (pokemonData) {
      return transformPokemonData(pokemonData);
    }
  } catch (error) {
    console.error('Error al obtener los datos del Pokémon de la API:', error);
  }

  // Si no se encuentra en la API, buscar en la base de datos
  const dbPokemon = await Pokemon.findOne({
    where: { id },
    include: [{ model: Type, attributes: ['name'], through: { attributes: [] } }],
  });

  if (!dbPokemon) {
    throw new Error('No se encontró ningún Pokémon con ese id');
  }

  const pokemonData = {
    id: dbPokemon.id,
    name: dbPokemon.name,
    image: dbPokemon.image,
    life: dbPokemon.life,
    attack: dbPokemon.attack,
    defense: dbPokemon.defense,
    speed: dbPokemon.speed,
    height: dbPokemon.height,
    weight: dbPokemon.weight,
    types: dbPokemon.types.map((type) => type.name),
  };

  return pokemonData;
};

module.exports = { getPokemonById };
