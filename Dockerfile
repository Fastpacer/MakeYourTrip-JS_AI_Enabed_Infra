# Use official Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=false

# Copy source code
COPY . .

# Expose API port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]
