# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . ./

ENV REACT_APP_API_URL=/api

RUN npm run build

# production environment
FROM nginx:1.21.0-alpine

WORKDIR /app

COPY --from=build /app/build /usr/share/nginx/html/frontend

RUN apk update --no-cache && apk add --upgrade libxml2-dbg=2.9.12-r0 curl-doc=7.78.0-r0 curl=7.78.0-r0 libxml2=2.9.12-r0 gettext=0.20.2-r2 --no-cache



# copy Nginx config files
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf.template /etc/nginx/

# set file permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx /etc/nginx/

COPY ./entrypoint.sh /app/entrypoint.sh
# switch to non-root user
USER nginx

EXPOSE 8080


ENTRYPOINT ["sh", "./entrypoint.sh"]
