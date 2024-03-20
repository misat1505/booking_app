FROM node:21
WORKDIR /app/images
COPY package*.json ./
RUN npm install
COPY . .

# RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]
