FROM node:alpine
#  AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM node:alpine
#  AS prod

ENV NODE_ENV production
ENV PORT 80

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

COPY --from=0 /app/build build/

EXPOSE 80

CMD ["node", "server.js"]
