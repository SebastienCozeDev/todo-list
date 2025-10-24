FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "dev"]
