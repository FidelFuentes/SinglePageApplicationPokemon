const { deletePokemon } = require('../controllers/deletePokemon');

const deletePokemonHandler = async (req, res) => {
    const { id } = req.params;

    try {
        await deletePokemon(id);
        return res.status(200).send(`Pokemon ${id} eliminado con éxito.`);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { deletePokemonHandler };
