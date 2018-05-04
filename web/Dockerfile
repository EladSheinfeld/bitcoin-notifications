FROM node:8

# RUN npm install webpack -g

 WORKDIR /src/app
 COPY package.json .
 RUN ["npm", "install"]
 COPY . .
# RUN webpack

#RUN npm install webpack -g
#RUN npm install webpack-cli -g
#WORKDIR /tmp
#COPY package.json /tmp/
#RUN npm config set registry http://registry.npmjs.org/ && npm install
#WORKDIR /src/app
#COPY . /src/app
#RUN cp -a /tmp/node_modules /src/app
#RUN webpack
