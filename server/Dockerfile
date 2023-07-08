FROM node:alpine
WORKDIR /usr/src/app/server
COPY package*.json .
RUN npm ci
COPY . .
# EXPOSE 5000
CMD ["npm", "run", "dev"]