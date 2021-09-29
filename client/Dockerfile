FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn codegen

CMD ["yarn", "start"]
