FROM node:10.15.3 as web

ARG NODE_ENV='production'
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/app/web/

COPY package.json .
RUN NODE_ENV=development npm install

COPY . .

RUN npm run build

ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]
