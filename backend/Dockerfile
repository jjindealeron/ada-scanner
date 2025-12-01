# Use the official Playwright image which includes all browser dependencies
FROM mcr.microsoft.com/playwright:v1.57.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Start the server
CMD [ "node", "server.js" ]
