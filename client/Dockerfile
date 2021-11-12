# Naively Simple Node Dockerfile

FROM node:14.17-alpine

RUN mkdir -p /home/client/ && chown -R node:node /home/client
WORKDIR /home/client
COPY --chown=node:node . .

USER node

RUN npm install
RUN npm run build

EXPOSE 3001
CMD npm run start
