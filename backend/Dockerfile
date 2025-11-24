FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD [ "node", "src/server.js" ]