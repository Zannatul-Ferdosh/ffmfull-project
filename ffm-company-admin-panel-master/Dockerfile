FROM node:14

WORKDIR /usr/app
RUN npm install -g pm2
COPY ./package*.json ./

RUN npm install --production

COPY ./ ./

RUN npm run build

EXPOSE 8080

USER node
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
#CMD [ "npm", "start" ]
