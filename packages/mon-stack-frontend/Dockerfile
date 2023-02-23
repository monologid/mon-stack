FROM node:lts-alpine AS deps
WORKDIR /app
RUN npm i -g pnpm
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

FROM node:lts-alpine AS builder
WORKDIR /app
RUN npm i -g pnpm
COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=deps /app/package.json ./package.json
COPY . .
ENV NODE_ENV=production
RUN pnpm prisma generate
RUN pnpm build

FROM node:lts-alpine AS runner
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/ ./.next/
EXPOSE 3000
CMD ["npm", "start"]