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

RUN mkdir -p /usr/local/config-api

########################################
# Coping Code
########################################

COPY ./ /usr/local/config-api
WORKDIR /usr/local/config-api

RUN npm config set unsafe-perm true
########################################
# Install pm2 and setup the repo
########################################

RUN npm install && npm install -g pm2

########################################
# Expose Port
########################################

EXPOSE 3000

CMD ["pm2-docker", "index.js", "--no-auto-exit"]
