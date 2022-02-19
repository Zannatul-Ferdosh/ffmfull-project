FROM node:8-alpine
WORKDIR /app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install 
ADD . /app
EXPOSE 3000
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
CMD ["npm", "run", "start:dev"]

