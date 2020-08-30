# Promo Module #

This is the service for Promo module function. 


# Technical Stack #
Ideally this should be deployed as serverless function like AWS Lambda. This assignemt is built with NodeJS and Express.

### APIs ###

* `GET /?user_id=1001&user_city=Ciaro&user_segment=MV` gets the ideal promo ratio of user by fetching the Promo Multiplier from config API and Target ratio from City Target service.
