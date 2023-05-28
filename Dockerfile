FROM node:18-buster

WORKDIR /app

COPY . .

RUN npm install --production

CMD ["npm", "start"]
