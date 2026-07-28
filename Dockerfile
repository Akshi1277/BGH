FROM node:20-alpine

WORKDIR /app

# Copy package management files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the frontend production assets
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

# For Next.js use "npm", "run", "start"
# For Vite/Static apps using 'serve' package: "npx", "serve", "-s", "dist", "-l", "3000"
CMD ["npm", "run", "start"]