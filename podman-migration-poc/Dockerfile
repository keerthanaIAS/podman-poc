FROM node:18-alpine

# Install required dependencies
RUN apk add --no-cache git bash tzdata

# Set timezone
ENV TZ=Asia/Calcutta
RUN cp /usr/share/zoneinfo/Asia/Calcutta /etc/localtime

# Set workdir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cache busting
ARG API_NEWTWELVE_CACHE_BUST_RESYNC
RUN echo "api new twelve bust: $API_NEWTWELVE_CACHE_BUST_RESYNC"

# Install dependencies
RUN npm cache clean --force && \
    npm install --legacy-peer-deps --force

# Copy application
COPY . .

# Build
RUN npm run build

# Application port
EXPOSE 3001

# Start application
CMD ["npm", "start"]