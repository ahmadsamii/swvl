const express = require('express');

const CityCtrl = require('../app/city/CityCtrl');

const router = express.Router({
  mergeParams: true
});

router.get('/', CityCtrl.getAllCities);
router.get('/:name', CityCtrl.getCityByName);
router.post('/', CityCtrl.addCity);
router.delete('/:id', CityCtrl.deleteCity);

module.exports = router;
