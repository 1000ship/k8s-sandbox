#어떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM node:12-alpine

# /app 디렉토리 생성
RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install

#환경변수 NODE_ENV 의 값을 development 로 설정
ENV DUMMY_VALUE "This dummy value from Dockerfile"
ENV SERVER_PORT 80

#가상 머신에 오픈할 포트, 가상에서 80이 로컬의 3000
EXPOSE 80 80

#컨테이너에서 실행될 명령을 지정
CMD ["npm", "start"]