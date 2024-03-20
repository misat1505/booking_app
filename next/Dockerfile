FROM node:21
WORKDIR /app/next
COPY package*.json ./
RUN npm install
COPY . .

ENV MONGODB_URI=mongodb://mongodb:27017/booking2_mongodb
ENV JWT_SECRET=gwsuydwqfuyqewgfyeqgfiugeqfqfpiue
ENV NEXT_PUBLIC_IMAGE_SERVER_URL=http://localhost:5001

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
