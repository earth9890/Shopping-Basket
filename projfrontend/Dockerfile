
FROM node:lts-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

ENV REACT_APP_BACKEND=http://localhost:8000/api

# Exports
EXPOSE 3000

CMD ["npm","start"]

