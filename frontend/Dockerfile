FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g @ionic/cli
RUN npm install -g serve

COPY . .

RUN ionic build

EXPOSE 8100

CMD ["serve", "-s", "www", "-l", "8100"]
