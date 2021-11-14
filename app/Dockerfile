# get the dependencies
FROM node:17.1.0-alpine3.14 AS deps

WORKDIR /home/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# build the application
FROM node:17.1.0-alpine3.14 AS BUILD_IMAGE

WORKDIR /home/app
COPY --from=deps /home/app/node_modules ./node_modules
COPY . .
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

# run the application
FROM node:17.1.0-alpine3.14

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
WORKDIR /home/app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /home/app/package.json /home/app/yarn.lock ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /home/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /home/app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /home/app/.next ./.next

COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /home/app/next.config.js  ./

USER nextjs

EXPOSE 3001

CMD [ "yarn", "start", "-p", "3001" ]
