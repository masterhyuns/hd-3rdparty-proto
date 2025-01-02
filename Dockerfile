# React Application Dockerfile
FROM node:20-alpine
ENV HOST=0.0.0.0
ENV PUBLIC_URL=https://kda.kia.com
# Git 설치
RUN apk add --no-cache git

WORKDIR /app

# package.json 복사 및 의존성 설치
COPY package*.json ./
RUN yarn install --legacy-peer-deps

# 소스 복사
COPY . .

EXPOSE 3000

CMD ["yarn", "start", "--", "--disable-host-check"]