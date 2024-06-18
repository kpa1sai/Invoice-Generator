# Stage 1: Build React application
FROM node:14 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve React application using Nginx
FROM nginx:alpine

# Copy build artifacts from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to outside Docker network
EXPOSE 80

# Start Nginx server in foreground
CMD ["nginx", "-g", "daemon off;"]
