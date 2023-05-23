// nuestros handler se encargan de  Recibir la request, Unificar datos , Devolver la respuesta
// incoca al controller ==> EL HANDLER NO INTERACTUA CON FUENTES EXTERNAS
// diferencia entre params y query es que la query no modifica la ruta original. ?nose=lalal ==> no lo renderiza y no pasa nada.
const { createPokemon } = require('../controllers/createPokemon');

const createPokemonHandler = async (req, res) => {
  let { name, life, attack, defense, speed, height, weight, types } = req.body;

  // Imprimir los tipos para depurar
  console.log('Types before splitting:', types);

  // Tratar los tipos como una cadena y dividirla en una matriz en el controlador
  types = types.split(',').map(type => type.trim());

  // Vuelve a imprimir los tipos después de la corrección
  console.log('Types after splitting:', types);

  try {
    let image;
    if (req.file) {
      // La imagen subida se encuentra en req.file.path
      image = req.file.path; 
      console.log('esta es',image)
      console.log('Types:', types);
    }
    console.log(req.body); // Imprime los campos de texto de los datos del formulario
    console.log(req.file); // Imprime los datos del archivo enviado

    // Crear el Pokemon en la base de datos
    const createdPokemon = await createPokemon(name, life, attack, defense, speed, height, weight, types, image);

    return res.status(201).json(createdPokemon);
  } catch (error) {
    console.log(error)
    return res.status(409).json({ error: error.message });
  }
};


module.exports = { createPokemonHandler };
