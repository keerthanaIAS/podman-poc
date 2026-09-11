# Use lightweight Node.js Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose the port (documentation only, actual mapping happens at runtime)
EXPOSE 3000

# Run as non-root user (Podman best practice — Docker doesn't do this by default)
USER node

# Start the service
CMD ["npm", "start"]