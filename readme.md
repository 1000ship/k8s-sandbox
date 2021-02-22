# Kubenetes Practice

> 아무리 Docs를 봐도 자세한 내용을 알기 힘들어 맨땅에 헤딩하며 배우기 위해 개설했다.

## #1 kubis (2021. 01. 09.)

- 첫 Kubenetes 구축 및 RC, Service, Pod을 만들어보며 이해하고 Load Balancer를 통해 외부로 접속할 수 있게끔 구현해보았다.
- Docker Image는 직접 만들지 않고 인터넷 상 공개된 간단한 Image를 불러와 사용하였음

## #2 webserver (2021. 02. 11.)

- 랩실에서 필요한 기능을 만들기 위해 연구하는데 목적을 둔다.
- 다음과 같은 기능을 하는 Python 프로그램을 만들어야한다.
  - tail 명령어처럼 상태를 실시간 모니터링할 수 있어야한다
  - Image를 Pod / Container 로 띄우고 내릴 수 있어야한다
  - Pod 간 데이터 전송이 이루어져야한다.
- System Command 는 사실 간단해서 Pod가 데이터 전송을 위해 환경변수 세팅이 되는지 테스트하고자했다. webserver는 express로 환경변수로 받은 포트로 서버를 Listening 하고 접속하면 환경변수에 세팅된 값을 Response 값으로 보낸다.
  - Pod은 환경변수 설정이 잘된다
  - Replication Controller로 만들어진 것은 환경변수 적용이 안된다.
  - Dockerfile 에서 설정한 환경변수 값은 Kubernetes 에서 설정한 환경변수에 의해 덮혀 쓰여진다.
  - Service 에서 ClusterIP 로는 외부 아이피 노출이 안됐다. 대상이 1개라도 LoadBalancer를 통해서만 ExternalIP 설정이 가능했다.

## #3 job (2021. 02. 11.)

- Job 예제를 사용해 출력된 결과 값 확인까지 해본다.
- Python으로 환경변수 FIRST_VALUE, SECOND_VALUE 값을 받아 합을 출력하는 프로그램을 만들고 Job으로 실행해본다.
- 일단, 입력을 환경변수로 받고 출력은 `kubectl logs <pod-name>`으로 구했다.
- 모니터링을 통해 종료된 Job을 인지하고 다음 순서로 넘기는 방법으로 하면 될 것 같다.

## #4 executors (2021. 02. 21.)

- Docker Hub에 있는 GCC, Python, Ruby, Openjdk를 활용하여 C, C++, Python, Ruby, Java 프로그램을 실행하여 결과 값을 도출해내는 이미지를 만든다. 실행 시간을 측정하기위해 실행 전후로 `date`로 시간을 찍어낸다.
- 소스코드, 입력 값은 Persistant Volume을 연결하여 사용토록한다.
- 출력 값은 `kubectl logs <pod-name>`으로 얻는다.
- 이는 Solvit Online Judge 프로그램으로 사용할 겸 만들었다.