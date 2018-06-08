const express = require('express');

const petRouter = express.Router();
const {petController} = require('../controllers');
const debug = require('debug')('app:petRoutes');


function petRouteFunc(nav) {
  const { getAllPets, getSinglePet, getPetOfUniqueNameAndBreed, insertPet, updatePet, removePet } = petController(nav);

  debug('entered petRoute');
  petRouter.route('/').get(getAllPets);
  petRouter.route('/:id').get(getSinglePet);
  petRouter.route('/unique/:name/:breed').get(getPetOfUniqueNameAndBreed);
  petRouter.route('/').post(insertPet);
  petRouter.route('/:id').put(updatePet);
  petRouter.route('/:id').delete(removePet);
  return petRouter;
}

module.exports = petRouteFunc;
