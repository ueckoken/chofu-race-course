FROM node:16.20-bullseye as deps
WORKDIR /app
COPY package.json .yarnrc.yml yarn.lock /app/
COPY .yarn/releases/ /app/.yarn/releases

RUN yarn install --immutable

FROM node:16.20-bullseye as builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . /app

RUN yarn build

FROM gcr.io/distroless/nodejs:16 AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000
USER nonroot
CMD ["server.js"]
