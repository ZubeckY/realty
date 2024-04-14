FROM node:18-alpine as backend
WORKDIR /server
COPY . /server/
RUN npm run build
EXPOSE 4000
CMD npm start