# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . ./

ENV REACT_APP_API_URL=https://backend.kieni.at

RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html


# copy Nginx config files
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/

# set file permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx /etc/nginx/

# switch to non-root user
USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]