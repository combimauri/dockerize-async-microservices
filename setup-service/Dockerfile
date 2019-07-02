FROM node:10

ADD . /app/setup-service

RUN cd /app/setup-service; \
    npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

CMD /wait && node /app/setup-service/rabbit-mq-setup.js