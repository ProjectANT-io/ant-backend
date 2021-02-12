FROM node:alpine
#  AS builder

WORKDIR /app

# copy over package.json files
COPY package*.json ./

# install npm packages
RUN npm install

# copy over all source code
COPY ./ ./

# build TypeScript
RUN npm run build

FROM node:alpine
#  AS prod

# set production env variables
ENV NODE_ENV production
ENV PORT 80

WORKDIR /app

# copy over package.json files
COPY package*.json ./

# install npm production packages
RUN npm ci --production

# copy over authentication keys folder
COPY KEYS/ ../KEYS/

# copy over built TypeScript files from builder stage
COPY --from=0 /app/build ./

# expose port
EXPOSE 80

# start server
CMD ["node", "server.js"]
