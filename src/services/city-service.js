const { StatusCodes, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
     } catch (error) {
      // console.error("City creation failed:", error); // ✅ This is the new line
      
        if (error.name == 'SequelizeValidationError'|| error.name == 'SequelizeUniqueConstraintError') {
           let explanation = [];
           error.errors.forEach((err) => {
              explanation.push(err.message);
  
           });
           throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
     }
}


module.exports={
    createCity
}