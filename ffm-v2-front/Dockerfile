FROM node:14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . ./
RUN npm run build
RUN npm install serve
CMD ["npm", "run","prod"]
