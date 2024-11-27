# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend application into the container
COPY . /app

# Build the Next.js app for production
RUN npm run build

# Expose port 3000 for the frontend server
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
