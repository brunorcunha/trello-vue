FROM node:13.12.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
