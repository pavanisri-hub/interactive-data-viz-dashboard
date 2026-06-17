# Stage 1: Build the Vite React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a basic nginx config (optional override)
# This keeps default config which serves from /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]