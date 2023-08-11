FROM node:18

WORKDIR /app
COPY . .
RUN npm install -g serve
RUN npm ci
RUN npm run build

EXPOSE 6060
ENV NODE_ENV=production
