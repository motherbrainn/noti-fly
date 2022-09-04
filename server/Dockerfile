FROM node:16 AS server-build
WORKDIR /usr/src/app
ENV NODE_ENV='production'
COPY / ./
RUN npm install

EXPOSE 4000

CMD ["node", "./app.js"]