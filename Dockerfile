FROM node:11-alpine
WORKDIR /reactD2B
COPY package.json /reactD2B
RUN npm install
RUN npm run build
COPY . /reactD2B
CMD ["npm","run","production"]