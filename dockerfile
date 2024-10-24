
# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

#Copy the rest of the application
COPY . .

# expose the post 
EXPOSE 5173

# START THE APP
CMD [ "npm", "run", "dev", "--", "--host" ]

# build the app
# RUN npm run build

# # Step2: use an nginx image and serve the static files 
# FROM nginx:alpine

# # copy the build react app from the previous step
# COPY  --from=build /app/dist /usr/share/nginx/html

# # Copy the custom Nginx Configuration

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # expose port 3000
# EXPOSE 3000

# # COMMAND TO RUN nginx 
# CMD ["nginx", "-g", "daemon off;"]