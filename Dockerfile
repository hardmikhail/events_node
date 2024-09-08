FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["sh", "-c", "npm run migration:run && npm start"]