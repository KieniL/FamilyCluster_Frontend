#!/bin/sh

export TMP='$'
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf


nginx -g 'daemon off;'