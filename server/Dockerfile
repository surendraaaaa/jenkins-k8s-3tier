FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
