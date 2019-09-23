FROM node:8-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

#

FROM node:8-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/.build/src ./src
COPY serverless-config/functions.yml ./serverless-config/functions.yml
COPY serverless-config/serverless-docker.yml ./serverless.yml
EXPOSE 3000
CMD [ "./node_modules/.bin/slss", "offline", "--host", "0.0.0.0", "--port", "3000" ]
