const axios = require('axios');
const debug = require('debug')('app:darkSkyApiService');
const config = require('config');

function darkSkyApiService(nav) {
  function getDarkAkyApiByLongLat(req, res) {
    debug(`getDarkAkyApiByLongLat${req.params.lat} ${req.params.lon}`);

    return new Promise((resolve, reject) => {
      axios.get(`https://api.darksky.net/forecast/${config.get('DarkSky.ApiKey')}/${req.params.lat},${req.params.lon}?exclude=minutely,daily,hourly,flags`)
        .then((response) => {
          const reuslt = JSON.stringify(response.data.currently.summary);
          const reusltIcon = JSON.stringify(response.data.currently.icon);
          debug(response.data);
          debug(reuslt);
          resolve({response});
          res.status(200)
            .json({
              status: 'success',
              message: reuslt,
              icon: reusltIcon
            });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return {getDarkAkyApiByLongLat};
}

module.exports = darkSkyApiService;
