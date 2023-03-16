FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN apk update
RUN npm install -g serve
RUN npm install
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*
EXPOSE 3000
CMD serve -s build
# docker build -t pedrotti/node:react .