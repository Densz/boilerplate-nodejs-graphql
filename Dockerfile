FROM node:alpine

WORKDIR /usr/app

RUN apk add postgresql-client
COPY ./package.json ./
RUN npm i
COPY ./ ./

CMD ["npm", "run", "dev"]

### COMMAND HELPERS
# IF DOCKERFILE.DEV
# docker build -t dzheng42/node-boilerplate -f Dockerfile.dev .
# ELSE
# docker build -t dzheng42/node-boilerplate .
# docker run -p 8888:8888 dzheng42/node-boilerplate
# docker attach <container_id>
# docker exec -it <container-id> /bin/bash