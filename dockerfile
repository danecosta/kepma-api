FROM node:12

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

RUN npm install loadtest -g

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 8787

CMD ["pm2-runtime", "ecosystem.config.js"]
