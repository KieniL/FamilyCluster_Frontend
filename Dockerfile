# build environment
FROM luke19/node-base-image:1627573790 as build


ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install

#Copy only needed files and directories into container
COPY public /app/public
COPY src /app/src
COPY tsconfig.json /app/tsconfig.json

ENV REACT_APP_API_URL=/api

RUN npm run build

# production environment
FROM luke19/nginx-base-image:1628796588


COPY --from=build /app/build /usr/share/nginx/html/frontend



# copy Nginx config files
COPY nginx/default.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf.template /app/nginx.conf.template

RUN cp /etc/nginx/conf.d/default.conf /app/conf.d/default.conf


COPY ./entrypoint.sh /app/entrypoint.sh


EXPOSE 8080


ENTRYPOINT ["sh", "./entrypoint.sh"]
