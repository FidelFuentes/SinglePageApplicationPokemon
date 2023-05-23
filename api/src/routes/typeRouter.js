const { Router } = require('express');
const { getAllTypesHandler } = require('../handlers/getTypesHandler');

const typeRouter = Router();

typeRouter.get('/', getAllTypesHandler);

module.exports = {typeRouter};
