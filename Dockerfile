# Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy package manager files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

EXPOSE 5000

CMD ["pnpm", "start"]
