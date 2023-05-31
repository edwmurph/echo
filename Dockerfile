FROM node:18-buster

RUN apt-get update && \
    apt-get install -y \
        unzip \
        curl \
    && apt-get clean \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf \
        awscliv2.zip \
    && apt-get -y purge curl \
    && apt-get -y purge unzip

WORKDIR /app

COPY . .

RUN npm install --production

CMD ["npm", "start"]
