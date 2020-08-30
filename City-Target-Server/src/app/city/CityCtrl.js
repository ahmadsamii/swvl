const CityHandler = require('./CityHandler');

class CityCtrl {

  /**
 * @api {post} /api/city Add New City
 * @apiName CreateCity
 * @apiGroup City
 * @apiDescription create new cities
 * @apiParam {String} name City Name
 *
 * @apiSuccess {Boolean} success API success
 * @apiSuccess {Object} data placeholder
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {}
 *     }
 *
 */

  static async addCity (req, res) {

    try {

      const data = await CityHandler.addCity(req.body);

      res.json({ success: true, data });

    } catch (error) {

      res.status(400).json({ success: false, message: error.message });

    }

  }

  /**
 * @api {get} /api/city/:name Get city by name
 * @apiName GetCityByName
 * @apiGroup City
 * @apiDescription API to get city by name
 * @apiParam {String} name City name
 *
 * @apiParam (Login) {String} token auth token need to be provided in headers<b>(x-access-token)</b> or in URL query(?token="TOKEN")
 *
 * @apiSuccess {Boolean} success api success
 * @apiSuccess {Object} data placeholder
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {}
 *     }
 */

  static async getCityByName (req, res, next) {

    try {

      const data = await CityHandler.getCityByName(req.params.name);

      res.json({ success: true, data });

    } catch (error) {

      res.status(400).json({ success: false, message: error.message });

    }

  }

  /**
 * @api {delete} /api/city/:id Delete City
 * @apiName DeleteCity
 * @apiGroup City
 * @apiDescription Staff API to delete city
 * @apiParam {String} id City id
 *
 * @apiParam (Login) {String} token auth token need to be provided in headers<b>(x-access-token)</b> or in URL query(?token="TOKEN")
 *
 * @apiSuccess {Boolean} success api success
 * @apiSuccess {Object} data placeholder
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {}
 *     }
 */

  static async deleteCity (req, res) {

    try {

      await CityHandler.deleteCity(req.params.id);

      res.json({ success: true, data: {} });

    } catch (error) {

      res.status(400).json({ success: false, message: error.message });

    }

  }

  /**
 * @api {get} /api/city Fetch Cities
 * @apiName ListCities
 * @apiGroup City
 * @apiDescription API to fetch Cities list. It will return all cities
 * @apiSuccess {Boolean} success api success
 * @apiSuccess {Object} data list of cities
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": []
 *     }
 */

  static async getAllCities (req, res) {

    try {

      const data = await CityHandler.getCities();

      res.json({ success: true, data });

    } catch (error) {

      res.status(400).json({ success: false, message: error.message });

    }

  }

}

module.exports = CityCtrl;
