# Dockerfile for React app

# Use the official Node.js image with version 16 (or the version compatible with your app)
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on (3000 is React's default)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
