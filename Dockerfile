ARG BUN_VERSION=1.4.4

FROM oven/bun:${BUN_VERSION}-alpine AS deps
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache tini curl && \
    addgroup -S app && \
    adduser -S app -G app -u 1001

COPY --from=builder --chown=app:app /app/.output ./.output

USER app

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=5 \
    CMD curl -f http://localhost:3000/ || exit 1

EXPOSE 3000
ENV PORT=3000 \
    HOST="0.0.0.0"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", ".output/server/index.mjs"]
