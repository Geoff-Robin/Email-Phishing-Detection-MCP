FROM node:18-bullseye

WORKDIR /app

# Install locales and dependencies
RUN apt-get update && apt-get install -y locales && \
    sed -i '/en_US.UTF-8/s/^# //' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build && \
    mkdir -p dist/models && \
    cp -r src/models/* dist/models/

EXPOSE 3000

CMD ["npm", "start"]
