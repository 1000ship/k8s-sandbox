# 각 언어 실행기 만들어보기

## 지원할 언어

- C
- C++
- Java
- Python
- Ruby

## 동작 설명

- 각 언어 Dockerfile은 다음과 같은 동작을 한다.
  - 언어 Image를 불러온다.
  - 환경변수 `$SOURCE_FILE` 위치에 있는 소스코드를 실행/컴파일한다.
  - 환경변수 `$INPUT_FILE` 위치에 있는 텍스트파일을 입력 값으로 준다.
  - 프로그램 실행 전, 실행 후 Date 명령으로 나노초 단위로 타임스탬프를 찍는다.
- 각 언어 Pod YAML 파일은 다음과 같은 동작을 한다.
  - 마스터 노드에 있는 `shared` 폴더에 Persistance Volume을 연결한다.
  - `shared` 경로는 절대경로로 주었으므로, Clone하여 코드 수정 시 yaml 파일 수정이 필요하다.
  - 연결된 Volume에 있는 `input.txt`와 각 언어 test 소스코드 위치를 환경변수로 담아준다.
- 각 언어 test 파일은 다움과 같은 동작을 한다.
  - 첫째 줄에 `hello`를 출력하고 둘째 줄에 `stdin` 에서 입력 받은 값을 그대로 출력한다.
  - 입력 값 input.txt 에는 `world` 가 들어가 있다.

## 자주 쓴 명령어

```bash
# 현재 도커에 있는 이미지를 조회한다.
docker images

# Dockerfile 이 있는 위치를 잡아주고 이름을 정해 Docker Image를 Build한다.
docker build -t <image-name> <docker-workspace-path>

# 쿠버네티스에 YAML 파일을 적용하여 생성/수정한다.
kubectl apply -f <pod-file>

# 쿠버네티스에 올라간 Pod을 조회한다.
kubectl get pods

# 쿠버네티스에서 동작하고 있는 Pod의 로그 값을 확인한다.
kubectl logs <pod-name>

# 쿠버네티스에 동작하고 있는 Pod을 삭제한다.
kubectl delete pod <pod-name>
```

