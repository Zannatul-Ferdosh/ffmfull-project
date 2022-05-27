FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm install pm2 -g
RUN npm run build
CMD ["pm2", "--no-daemon","start","npm","--","start"]


