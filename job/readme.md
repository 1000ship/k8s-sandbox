# Job 사용해보기

## 1. 일단 따라해보기

> https://kubernetes.io/docs/concepts/workloads/controllers/job/

- Kubernetes Docs의 Perl 언어로 PI(3.141592) 값을 2000자리 만큼 정밀하게 출력하는 프로그램을 yaml 파일로 만들어 실행해본다.

- 실행해본 결과 Create되어 결과가 나오기까지 시간이 꽤 오래 걸렸다.

  ```bash
  ~/workspace/k8s/k8s-sandbox/job master*
  ❯ kubectl get pods
  NAME       READY   STATUS    RESTARTS   AGE
  pi-gtgkn   1/1     Running   0          72s
  
  ~/workspace/k8s/k8s-sandbox/job master*
  ❯ kubectl get pods
  NAME       READY   STATUS      RESTARTS   AGE
  pi-gtgkn   0/1     Completed   0          72s
  ```

- 생성부터 실행 종료까지 약 72초나 걸렸다.. 환경을 직접 세팅해서 실행하다보니 그렇게 효율적인지는.. 잘 모르겠다..

- `kubectl get pods` 로 생성된 pod 이름을 알아낸 후, `kubectl logs pod-<hash>` 와 같이 입력하면 출력된 결과 값을 알 수 있다.



## 2. Python으로 입력을 받고 출력하는 프로그램 만들기

adder.py 를 만들고 환경변수를 통해 값 2개를 입력 받아 합을 출력하는 프로그램을 만들어본다.

```python
import os

firstValue = int(os.environ["FIRST_VALUE"])
secondValue = int(os.environ["SECOND_VALUE"])

print( firstValue + secondValue )
```

`FIRST_VALUE=1 SECOND_VALUE=2 python3 adder.py` 

다음과 같이 실행해보면 1과 2를 더한 값인 3이 출력된다.

이 간단한 파이썬 프로그램을 Kubernetes의 Job으로 띄워보도록하자

1. `/adder` 디렉토리의 Dockerfile 정보로 빌드한다

   `docker build -t adder-python .`

2. `job-adder.yaml`을 실행해본다.

   `kubectl apply -f job-adder.yaml`

   ```yaml
   apiVersion: batch/v1
   kind: Job
   metadata:
     name: adder
   spec:
     template:
       spec:
         containers:
         - name: adder
           image: adder-python
           imagePullPolicy: Never
           env:
             - name: FIRST_VALUE
               value: "1"
             - name: SECOND_VALUE
               value: "2"
         restartPolicy: OnFailure
     backoffLimit: 4
   ```

   

3. 관찰한다.

4. Python은 1초 안에 실행되고 결과가 나왔다

   ```
   ❯ kubectl logs adder-tcxg6
   3
   ```

   