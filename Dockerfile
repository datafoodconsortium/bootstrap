FROM node:13.14-alpine

WORKDIR /app

RUN apk add --update --no-cache git bash nodejs nano

CMD npm install && npm run dev
