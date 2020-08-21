FROM node:lts

# COPY server.js /server.js
COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 4000

CMD ["npm","start"]