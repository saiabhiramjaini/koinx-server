# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (alternative approach)
RUN npm install -g typescript

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]