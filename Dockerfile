FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./
COPY . ./

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]