const db = require('../persistence/db');
const debug = require('debug')('app:petController');


function petController(nav) {


  function getAllPets(req, res, next) {
    debug('getAllPets');
    db.any('select * from pets')
      .then((data) => {
        res.status(200)
          .json({
            status: 'success',
            data,
            message: 'Retrieved ALL pet'
          });
      })
      .catch(err => next(err));
  }


  function getSinglePet(req, res, next) {
    debug('getSinglePet');
    const pupID = req.params.id;
    db.one('select * from pets where id = $1', pupID)
      .then((data) => {
        res.status(200)
          .json({
            status: 'success',
            data,
            message: 'Get Single pet data'
          });
      })
      .catch(err => next(err));
  }



  function getPetOfUniqueNameAndBreed(req, res, next) {
    debug('getPetOfUniqueNameAndBreed');
    debug(  [req.params.name, req.params.breed]);
    
    db.one(' SELECT CASE WHEN EXISTS ( '+
     ' SELECT * FROM PETS WHERE  UPPER(name) = UPPER( $1 ) and UPPER(breed) = UPPER($2)  ) '+
     '  THEN CAST(1 AS BIT) ' +
    ' ELSE CAST(0 AS BIT) END ', [req.params.name, req.params.breed])
      .then((data) => {
        debug(data);
        res.status(200)
          .json({
            status: 'success',
            data,
            message: 'Get Unique name and breed result.'
          });
      })
      .catch(err => next(err));
  }


  function insertPet(req, res, next) {
    debug('inserPet');
    debug(req.body);
  
    debug(JSON.stringify(req.body.name));
    db.none(
      'insert into pets(name, type, breed, location, latitude, longitude)' +
      'values( ${name}, ${type}, ${breed}, ${location}, ${latitude}, ${longitude} )',
      req.body)
      .then(() => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one pet'
          });
      })
      .catch((err) => {
        debug(err);
        return next(err);
      });
  }


  function updatePet(req, res, next) {
    db.none(
      'update pets set name=$1, breed=$2, type=$3, location=$4, latitude=$5, longitude=$6 where id=$7',
      [req.body.name, req.body.breed, req.body.type,
        req.body.location, req.body.latitude, req.body.longitude, req.params.id]
    )
      .then(() => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated pet'
          });
      })
      .catch((err) => {
        debug(err);
        return next(err);
      });
  }


  function removePet(req, res, next) {
    const pupID = parseInt(req.params.id);
    db.result('delete from pets where id = $1', pupID)
      .then((result) => {
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} pet`
          });
      })
      .catch((err) => {
        debug(err);
        return next(err);
      });
  }


  return {
    getAllPets,
    getSinglePet,
    getPetOfUniqueNameAndBreed,
    insertPet,
    updatePet,
    removePet
  };
}


module.exports = petController;
