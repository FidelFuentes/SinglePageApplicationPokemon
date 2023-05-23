const axios = require('axios');
const { Type } = require('../db');

const MAX_RETRIES = 3;

async function fetchTypesData() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type`);
      return response.data;
    } catch (error) {
      console.error(`Error en el intento ${i+1} para obtener los tipos de Pokémon: ${error}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error('No se pudo obtener los tipos de Pokémon después de varios intentos');
}

const getTypes = async () => {
  const typesData = await fetchTypesData();
  const types = typesData.results.map(type => type.name);
  return types;
};

module.exports = { getTypes };

