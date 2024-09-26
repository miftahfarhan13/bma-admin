FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Ensure the node user has ownership of the app directory
RUN chown -R node:node /app

COPY package*.json ./

RUN npm install

COPY . .

# Switch to the node user
USER node

# Run the build command
RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 3000