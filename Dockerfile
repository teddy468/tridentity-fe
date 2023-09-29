FROM node:18-alpine AS base
RUN npm install -g glob rimraf

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BASE_URL_V2
ENV NEXT_PUBLIC_BASE_URL_V2=$NEXT_PUBLIC_BASE_URL_V2

ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

ARG NEXT_PUBLIC_TRI_APP_URL
ENV NEXT_PUBLIC_TRI_APP_URL=$NEXT_PUBLIC_TRI_APP_URL

ARG NEXT_PUBLIC_APP_ID
ENV NEXT_PUBLIC_APP_ID=$NEXT_PUBLIC_APP_ID

RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
