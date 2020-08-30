FROM alpine:3.7

WORKDIR /usr/local/

USER root

########################################
# Installing Dependencies
########################################

RUN apk add --no-cache \
    nodejs=8.9.3-r1 \
    nodejs-npm=8.9.3-r1 \
    python \
    g++ \
    git \
    make


########################################
# Create Code Direcotry
########################################

RUN mkdir -p /usr/local/city-target-api

########################################
# Coping Code
########################################

COPY ./ /usr/local/city-target-api
WORKDIR /usr/local/city-target-api

RUN npm config set unsafe-perm true
########################################
# Install pm2 and setup the repo
########################################

RUN npm install && npm install -g pm2

########################################
# Expose Port
########################################

EXPOSE 3010

CMD ["pm2-docker", "index.js", "--no-auto-exit"]
