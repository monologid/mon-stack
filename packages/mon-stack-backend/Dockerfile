FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 1337
CMD ["npm", "start"]
