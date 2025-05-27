# Stage 1: Build React app
FROM node:18-alpine as build

WORKDIR /app

# Accept build-time environment variables
ARG REACT_APP_SERVER_URL
ARG REACT_APP_PATIENT_SERVER_URL
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_DOCTOR_TOKEN
ARG REACT_APP_DOCTOR_URL

ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
ENV REACT_APP_PATIENT_SERVER_URL=$REACT_APP_PATIENT_SERVER_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_DOCTOR_TOKEN=$REACT_APP_DOCTOR_TOKEN
ENV REACT_APP_DOCTOR_URL=$REACT_APP_DOCTOR_URL

# Copy only package files first to cache npm install layer
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app with the env variables
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Optionally add custom Nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
