FROM node:lts-alpine as build

RUN apk add --update --no-cache \
    python3 make msttcorefonts-installer font-noto fontconfig \
    freetype ttf-dejavu ttf-droid ttf-freefont ttf-liberation \
    chromium \
  && rm -rf /var/cache/apk/* /tmp/* \
  && ln -sf python3 /usr/bin/python

RUN update-ms-fonts \
    && fc-cache -f

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 1337
CMD ["yarn", "start"]
