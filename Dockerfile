FROM oven/bun:1-alpine

COPY package.json ./
COPY bun.lockb ./
COPY src ./src

RUN bun install

ENTRYPOINT [ "bun", "run", "src/index.ts" ]
