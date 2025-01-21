FROM node:alpine
WORKDIR /appointment-API

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]