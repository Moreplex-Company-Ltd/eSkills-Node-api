#Base Image node:12.18.4-alpine
FROM node:16-alpine

#Set workinf directtyo tp /app
WORKDIR /app

#set PATH /app/ndoe_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

#copy package.json in the image
COPY package*.json ./

#install packages
RUN npm install 


#copy the app
COPY . .

RUN npm run build

#expose application port
EXPOSE 3000

#start the app
CMD ["node", "build/index.js"]

