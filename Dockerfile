FROM node:12-buster

WORKDIR /app

COPY . .

RUN npm install --production

EXPOSE 8080/tcp

CMD ["npm", "start"]
