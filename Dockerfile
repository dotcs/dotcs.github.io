FROM node:10

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY components /app/components
COPY feeds /app/feeds/
COPY pages /app/pages/
COPY styles /app/styles/
COPY public /app/public/
COPY hooks /app/hooks/
COPY server /app/server/
COPY *.ts *.js *.json /app/
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

ENTRYPOINT ["/usr/local/bin/npm", "run", "start"]

EXPOSE 3000