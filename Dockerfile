FROM node:14.18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=4096

RUN yarn build

FROM node:14.18-alpine

WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/.env* /app/package.json /app/yarn.lock ./

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=4096

RUN yarn install --frozen-lockfile --production

CMD ["node", "src/main.js"]
