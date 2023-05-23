//const Joi = require('joi');
const { Pokemon, Type } = require('../db');


const createPokemon = async (name, life, attack, defense, speed, height, weight, types,image) => {
  const data = { name, life, attack, defense, speed, height, weight, types,image };
 // const validationResult = (data); //pokemonSchema.validate

 // if (validationResult.error) {
   // throw new Error(validationResult.error.details[0].message);
  //}

 
    const newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
  
    // Agregar los tipos
  for (const typeName of types) {
    const [type] = await Type.findOrCreate({ where: { name: typeName } });
    await newPokemon.addType(type);
  }

  return newPokemon;
};

module.exports = {createPokemon}
/*
const pokemonSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  life: Joi.number().required(),
  attack: Joi.number().required(),
  defense: Joi.number().required(),
  speed: Joi.number().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(),
  types: Joi.array().items(Joi.string()).required(),
});
*/
/*const { Pokemon,Type } = require('../db')
const createPokemon = async (name,Imagen,Vida,Ataque,Defensa,Velocidad,Altura,Peso, types) => {
  
    // Crear el Pokemon en la base de datos
    const createdPokemon = await Pokemon.create({name,Imagen,Vida,Ataque,Defensa,Velocidad,Altura,Peso});

    // Obtener los registros de tipos relacionados con los nombres proporcionados
    const typeNames = types.map((type) => type.name);
    const typeRecords = await Type.findAll({ where: { name: typeNames } });


    // Relacionar el Pokemon con los tipos obtenidos
    await createdPokemon.addTypes(typeRecords);

    // Devolver el Pokemon creado con sus tipos relacionados
    return createdPokemon;
 
};

module.exports = { createPokemon };
*/