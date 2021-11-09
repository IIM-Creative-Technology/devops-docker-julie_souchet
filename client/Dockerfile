# Naively Simple Node Dockerfile

FROM node:14.17-alpine

RUN mkdir -p /home/client/ && chown -R node:node /home/client
WORKDIR /home/client
COPY --chown=node:node . .

USER node

RUN yarn install --frozen-lockfile
# RUN yarn build

EXPOSE 3000
CMD [ "yarn", "dev" ]
