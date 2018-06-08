const axios = require('axios');
const debug = require('debug')('app:locationService');

function locationService(nav) {
  function createResponse(data) {
    return {status: 'success', message: data};
  }
  function createError(err) {
    return {status: 'fail', error: err};
  }

  function validLatitude(x) {
    return x >= -90 && x <= 90;
  }

  function validLongitude(x) {
    return x >= -180 && x <= 180;
  }


  function isValidCordination(req, res) {
    const latitude = req.params.lat;
    const longitude = req.params.lon;

    if (!validLatitude(parseFloat(latitude))) {
      res.json(createError(`Invalid latitude ${latitude}`));
    } else if (!validLongitude(parseFloat(longitude))) {
      res.json(createError(`Invalid longitude ${longitude}`));
    } else res.json(createResponse('valid'));
  }


  function getLocationInfoByLongLat(req, res) {
    debug('getLocationInfoByLongLat');
    //  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.lon}`)
      .then((response) => {
        let passFail = 'success';
        if (response.data.results.length > 0) { passFail = 'success'; } else { passFail = 'fail'; }
        // resolve(passFail);
        res.status(200)
          .json({
            status: passFail,
            message: response.data.results[0],
          });
      })
      .catch((error) => {
        // resolve('fail');
        debug(error);
        res.status(400)
          .json({
            status: 'fail'
          });
        // });
      });
  }


  return {getLocationInfoByLongLat, isValidCordination};
}

module.exports = locationService;
