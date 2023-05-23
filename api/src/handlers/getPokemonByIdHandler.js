const { getPokemonById } = require("../controllers/getPokemonById")



const getPokemonByIdHandler = async (req,res) =>{

    const {id}= req.params;

    // Como en mis modelos de bd defino mis id con UUID ==> espero recibir un string.
    // Mientras que de la api el id lo espero recibir como number.

    const source = isNaN(id) ? 'bdd' : 'api';

    try {

        const response = await getPokemonById(id,source);

        // Si la respuesta es nula o indefinida, suponemos que el recurso no se encontró
        if(!response) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        return res.status(200).json(response);

    } catch (error) {

        return res.status(500).json({error: error.message});
    }
}

module.exports={getPokemonByIdHandler}