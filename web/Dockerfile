FROM node:latest

RUN npm install webpack -g
RUN npm install webpack-cli -g

WORKDIR /tmp
COPY package.json .
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

#COPY . .

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app

#RUN webpack

ENV NODE_ENV=development
ENV PORT=4000

#CMD [ "/usr/local/bin/node", "./src/main.js" ]

#EXPOSE 4000
