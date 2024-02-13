FROM node:18-bullseye

WORKDIR /app

ENV TZ="Asia/Shanghai"

COPY . .

# 如果各公司有自己的私有源，可以替换registry地址
RUN npx -y playwright install --with-deps

RUN npm i -g playwright-chromium  -y
RUN npm i -g @slidev/cli  -y
RUN npm i -g @slidev/theme-seriph  -y
RUN npm i -g @slidev/theme-default  -y

RUN npm install

RUN npm run build

# 如果端口更换，这边可以更新一下
EXPOSE 7001

CMD ["npm", "run", "start"]
