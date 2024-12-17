FROM node:18-alpine3.20

WORKDIR /app


COPY package.json ./

RUN npm install -g pnpm


COPY . .

EXPOSE 3000

