#!/bin/sh

export TMP='$'

cp -R /app/. /etc/nginx/
envsubst < /app/nginx.conf.template > /etc/nginx/nginx.conf


nginx -s reload


nginx -g 'daemon off;'
