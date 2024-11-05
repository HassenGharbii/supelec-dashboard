# Dockerfile for React app

# Use Node.js version 18
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Increase npm timeout (simple fix for network timeout issues)
RUN npm config set fetch-timeout 120000

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on (3000 is React's default)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
