const express = require('express');

const serviceRouter = express.Router();
const {darkSkyApiService, locationService} = require('../services');
const debug = require('debug')('app:serviceRoutes');


function serviceRouteFunc(nav) {
  const {getDarkAkyApiByLongLat } = darkSkyApiService(nav);
  const {getLocationInfoByLongLat} = locationService(nav);

  debug('entered serviceRouteFunc');
  serviceRouter.route('/weather/:lat/:lon').get(getDarkAkyApiByLongLat);
  serviceRouter.route('/location/:lat/:lon').get(getLocationInfoByLongLat);
  return serviceRouter;
}

module.exports = serviceRouteFunc;
