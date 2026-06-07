FROM node:22-alpine

WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app (VITE_* env vars must exist here)
RUN npm run build

# Use Vite preview server to serve the app
EXPOSE 3000
CMD ["npm", "run", "preview"]
