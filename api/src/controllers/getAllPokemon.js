const axios = require('axios');
const { Pokemon, Type } = require('../db');

const MAX_RETRIES = 3;

async function fetchPokemonData(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener datos de Pokémon: ${error}`);
  }
  throw new Error('No se pudo obtener los datos del Pokémon después de varios intentos');
}

function transformPokemonData(pokemonData) {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.front_default,
    life: pokemonData.stats[0].base_stat,
    attack: pokemonData.stats[1].base_stat,
    defense: pokemonData.stats[2].base_stat,
    speed: pokemonData.stats[5].base_stat,
    height: pokemonData.height,
    weight: pokemonData.weight,
    types: pokemonData.types.map(type => type.type.name)
  };
}

const getAllPokemon = async (name) => { 
  // Realizar búsqueda por nombre en la API
  if (name) {
    try {
      const pokemonData = await fetchPokemonData(name);
      const pokemonList = [transformPokemonData(pokemonData)];
      return pokemonList;
    } catch (error) {
      // Si no se encuentra en la API, buscar en la base de datos
      const dbPokemon = await Pokemon.findOne({
        where: { name },
        include: [{ model: Type, attributes: ['name'], through: { attributes: [] } }],
      });

      if (!dbPokemon) {
        throw new Error('No se encontró ningún Pokémon con ese nombre');
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
        created: true,
      };

      return [pokemonData];
    }
  } else {
    // Obtener todos los pokemones de la API
    const pokemonApi = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50');
    const pokemonUrls = pokemonApi.data.results.map((pokemon) => pokemon.url);

    const pokemonResponses = await Promise.all(pokemonUrls.map((url) => axios.get(url)));

    const pokemonList = pokemonResponses.map((pokemonResponse) => ({
      ...transformPokemonData(pokemonResponse.data),
      created: false,
    }));

    // Obtener todos los pokemones de la base de datos
    const dbPokemons = await Pokemon.findAll({
      include: [{ model: Type, attributes: ['name'], through: { attributes: [] } }],
    });

    const dbPokemonsData = dbPokemons.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      life: pokemon.life,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(type => type.name),
      created: true
    }));

    // Combina los pokemones de la API y de la base de datos
    return [...pokemonList, ...dbPokemonsData];
  }
};

module.exports = { getAllPokemon };
