FROM node:18-alpine as frontend
WORKDIR /client
COPY . /client/
RUN npm run build
EXPOSE 3000
CMD npm start
