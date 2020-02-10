FROM node:current-alpine as builder

WORKDIR /opt/frontend
COPY package.json package-lock.json ./
RUN npm i

ARG ENVIRONMENT=LOCAL
ENV ENVIRONMENT=$ENVIRONMENT

ENV NODE_ENV=production
COPY . ./
RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/frontend/conf/nginx.conf /etc/nginx/
COPY --from=builder /opt/frontend/conf/_rename_this.conf /etc/nginx/conf.d/
COPY --from=builder /opt/frontend/build /usr/share/nginx/html

EXPOSE 80
