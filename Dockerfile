FROM node:alpine

WORKDIR /app

# install cURL
RUN apk --no-cache add curl

# AWS
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install -i /usr/local/aws-cli -b /usr/local/bin

COPY package*.json ./

# Install dependencies
RUN npm install --production
COPY . .

# install TSC binary
RUN npm install -g typescript

# Build
RUN npm run build

ENV NODE_ENV production
ENV PORT 3000

# Bind the port that the image will run on
EXPOSE 3000

CMD ["npm", "start"]
