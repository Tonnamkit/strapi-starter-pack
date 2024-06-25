FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pg --save
RUN npm run build
COPY . .
CMD ["npm", "run","develop"]