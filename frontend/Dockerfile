FROM node:21-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE ${EXPOSED_PORT_FRONTEND}
ENTRYPOINT ["npm", "start"]
