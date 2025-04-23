# syntax=docker/dockerfile:1
FROM node:23-alpine AS base
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

# Install system dependencies and corepack
RUN apk update && apk upgrade && \
    apk add --no-cache libc6-compat && \
    npm install -g corepack && \
    corepack enable && \
    corepack prepare yarn@4.9.1 --activate  # Explicit version match

# Copy package manager files
COPY package.json yarn.lock .yarnrc.yml ./

# Install project dependencies
RUN yarn install --immutable

# Stage 2: Build application
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

# Set up Corepack in builder stage
RUN npm install -g corepack && \
    corepack enable && \
    corepack prepare yarn@4.7.0 --activate  # Activate in builder too

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
RUN yarn build

# Stage 3: Production image
FROM base AS production
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0

# Install runtime dependencies
RUN apk add --no-cache libc6-compat

# Copy built assets from builder
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Use unprivileged user
USER node
EXPOSE ${PORT}

CMD ["node", "server.js"]