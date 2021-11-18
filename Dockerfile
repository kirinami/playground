FROM node:14.18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV="production"

RUN yarn build

RUN rm -rf node_modules && yarn cache clean && yarn install --frozen-lockfile --production

FROM node:14.18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist dist
COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/.env* /usr/src/app/env.config.js ./
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./

ENV NODE_ENV="production"

CMD ["node", "dist/main"]
