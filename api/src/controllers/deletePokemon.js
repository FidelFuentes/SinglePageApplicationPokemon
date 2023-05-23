const { Pokemon } = require('../db');  

const deletePokemon = async (id) => {
    
    await Pokemon.destroy({
        where: {
            id: id
        }
    });
};

module.exports = { deletePokemon };
