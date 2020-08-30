FROM node:8

USER root

ENV HOME=/usr/local/city-target-web
RUN mkdir $HOME && \
    apt-get -qqy update && \
    apt-get -qqy --no-install-recommends install \
    nginx && \
    rm -rf /var/lib/apt/lists/*

WORKDIR $HOME

COPY ./ $HOME

RUN chmod 777 -R /usr/local/city-target-web && \
    chmod 777 -R /usr/local/lib/node_modules/ && \
    npm config set user 0 && \
    npm config set unsafe-perm true && \
    npm install -g ionic@5.1.1 @angular/cli typings && \
    npm install && \
    npm run build && \
    cp -f mesmer.nginx.conf /etc/nginx/conf.d/default && \
    cp -f mesmer.nginx.conf /etc/nginx/sites-available/default

EXPOSE 80
