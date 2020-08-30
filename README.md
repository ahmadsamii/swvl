# SWVL Assignment #

This is the combined repository for all modules mentioned in assigments

## Technical Stack ##
The whole assignment is mainly built with MEAN Stack. All backend modules are built using NodeJS, Express and MongoDB as core database. The City Target Module is built with Angular using Ionic Framework.


## Modules ##
#### `Config API` ####
this module is just a static service to server the constants

#### `Promo Module` ####
this module calculates the ideal promo ratio of a user based on user segment and city. This module fetches the values from respective services and calculates the ideal ratio using PromoModuleFucntion logic

#### `City Target Module` ####
This module is a full stack module built using MEAN stack. It manipulates the city target values and persist them in DB to make other services use these via exposed APIs.

#### `City Target Module` ####
This module is a full stack module built using MEAN stack. It manipulates the city target values and persist them in DB to make other services use these via exposed APIs.


#### `Promo Scheduler` ####
This is just a mongodb script that fetches the user ideal promos from Promo Module service against the provided data and populates the collection in Core Database with results.

## Deployments ##
The respecive modules are configured to be containerized and run as standalone services. 

## CI/CD ##
This project doesn't have proper CI/CD pipeline configured. We mainly use Jenkins pipeline for CI/CD deployments but due to limitation of time this couldn't be configured with this project.