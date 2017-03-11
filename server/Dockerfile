# Create image based on the official Node 6 image from the dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /home/jferroal/ngkoa-blog/server

# Change directory so that our commands run inside this new directory
WORKDIR /home/jferroal/ngkoa-blog/server

# Copy dependency definitions
COPY package.json /home/jferroal/ngkoa-blog/server

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /home/jferroal/ngkoa-blog/server

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "deploy"]
