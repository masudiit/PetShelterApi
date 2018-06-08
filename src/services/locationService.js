const axios = require('axios');
const debug = require('debug')('app:locationService');

function locationService(nav) {
  function getLocationInfoByLongLat(req, res) {
    debug('getLocationInfoByLongLat');

    // return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.lon}`)
      .then((response) => {
        let passFail = 'success';
        if (response.data.results.length > 0) { passFail = 'success'; } else { passFail = 'fail'; }
        res.status(200)
          .json({
            status: passFail,
            message: response.data.results[0],
          });
      })
      .catch((error) => {
        // reject(error);
        debug(error);
        res.status(400)
          .json({
            status: 'fail'
          });
      //  });
      });
  }
  return {getLocationInfoByLongLat};
}

module.exports = locationService;
