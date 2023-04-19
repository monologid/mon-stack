# mon-stack

A mono-repo project using Strapi and NextJS.

## Pre-requisite

Please make sure that you have Docker engine and NodeJS LTS version installed.

## Getting Started

### Setup environment

Run the docker compose file.

```bash
docker compose up -d
```

Make sure that MySQL and Redis have been running properly.

### Install dependencies

#### mon-stack-backend

Before installing dependencies, please install the latest version of yarn & pnpm.

```bash
npm install --global yarn pnpm
```

Now install the dependencies for mon-stack-backend:

```bash
pnpm backend install:yarn
```

#### mon-stack-frontend

Before installing dependencies, please install the latest version of yarn & pnpm.

```bash
npm install --global yarn pnpm
```

Now install the dependencies for mon-stack-frontend:

```bash
pnpm frontend install
```

### Run application servers

Please open 2 terminals as you will run the backend server and frontend app.

#### mon-stack-backend

To run the server, please make sure that you have configured `.env` file.

Go to the `packages/mon-stack-backend` folder and copy the `.env.example` file.

```bash
cd ./packages/mon-stack-backend
cp .env.example .env
```

Then configure each environment variables.

Start the backend server using following command.

```bash
cd ./packages/mon-stack-backend
yarn dev
```

#### mon-stack-frontend

To run the server, please make sure that you have configured `.env` file.

Go to the `packages/mon-stack-frontend` folder and copy the `.env.example` file.

```bash
cd ./packages/mon-stack-frontend
cp .env.example .env
```

Then configure each environment variables.

Start the frontend server using following command.

```bash
cd ./packages/mon-stack-frontend
pnpm dev
```

## Authors

- [Ais](https://github.com/madebyais/)