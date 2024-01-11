
FROM node:lts-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

ENV MONGO_USER=harishsugandhi09
ENV MONGO_PASSWORD=a1haOGDOIBEdkU8c
ENV DATABASE=test
ENV PORT=8000
ENV SECRET=AartiProduction

# Exports
EXPOSE 8000

CMD ["npm","start"]

