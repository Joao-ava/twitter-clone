FROM node:lts

RUN mkdir -p /home/node/server/node_modules && chown -R node:node /home/node/api
WORKDIR /home/node/server

COPY packege.json yarn.* ./
USER node
RUN yarn

COPY --chown=node:node . .

RUN yarn build

CMD ["yarn", "start"]
EXPOSE 3333
