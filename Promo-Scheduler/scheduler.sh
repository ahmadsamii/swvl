#!/bin/bash

# Pull latest code
git fetch
git checkout master
git pull

# Install dependencies
npm install

# Restart app
node scheduler.js