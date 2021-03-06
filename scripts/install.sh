#!/bin/bash
#start at root of code
cd /code
# refreshing the repositories
sudo apt-get update

# install sudo
sudo apt-get -y install sudo

# Time settings
sudo apt-get -y install tzdata

#Install certbot and cron
sudo apt-get -y install cron
sudo apt-get -y install certbot
sudo crontab -l 2>/dev/null; echo "0 */12 * * * root /usr/bin/certbot renew -w /code/tls >/dev/null 2>&1" | sudo crontab -

# Python and pip
# This is the biggest part and takes a long time...
# Needed to install node-gyp which is needed for rpio
# Without rpio this project doesn't work
sudo apt-get -y install python2.7

# git used for updating
sudo apt-get -y install git

# Installs all modules in package.json and checks for security issues and fix them
sudo npm install
sudo npm audit fix

# Run webpack so that the bundle.js can be created
sudo npx webpack --config webpack.config.js