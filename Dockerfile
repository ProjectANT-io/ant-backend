FROM node:14-alpine

WORKDIR /app

# Install cURL
RUN apk --no-cache add curl

# Install AWS
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install -i /usr/local/aws-cli -b /usr/local/bin

# Install dependencies
COPY package*.json ./
COPY .npmrc ./
RUN npm install --production

# Copy app source
COPY build/ ./

# Set Environment
ENV NODE_ENV production
ENV PORT 3000

# Bind the port that the image will run on
EXPOSE 3000

CMD ["npm", "start"]
