# build environment
FROM luke19/node-base-image:1627573790 as build


ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install
COPY . /app

ENV REACT_APP_API_URL=/api

RUN npm run build

# production environment
FROM luke19/nginx-base-image:1627574525


COPY --from=build /app/build /usr/share/nginx/html/frontend



# copy Nginx config files
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf.template /etc/nginx/



COPY ./entrypoint.sh /app/entrypoint.sh


EXPOSE 8080


ENTRYPOINT ["sh", "./entrypoint.sh"]
