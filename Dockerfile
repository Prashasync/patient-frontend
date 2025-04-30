# Stage 1: Build React app
FROM node:18-alpine as build

WORKDIR /app

# Copy only package files first to cache npm install layer
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

RUN npm install turbo@2.0.0

# Copy built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (optional, if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
