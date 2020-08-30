# City Target Module #
This is the backend of City Target portal.

# Technical Stack #
this is built using NodeJS Server with Express routing and Mongodb as core database.

### APIs ###

* `POST /api/city` updates/creates city target module 
* `GET /api/city` gets all city targets of all cities
* `GET /api/city/:name` gets target of a city by its name. Used by external services
* `DLETE /api/city/:id` deletes city target
