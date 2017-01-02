FROM node:6-alpine

ENV SECRET_TOKEN="somesupersecret"
ENV SUBDOMAIN="mysubdomain"
ENV ICLOUDUSER="me@mac.com"
ENV ICLOUDPASS="mypassword"

COPY package.json package.json
RUN npm install
COPY . .
CMD npm start
