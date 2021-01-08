# Kubis

## Environment

- CentOS 7
- Docker 19.03.9
- K8s 1.20
- hostname ( master, node-1, node-2 )
- Master(master)  - 192.168.0.150
- Worker1(node-1) - 192.168.0.151
- Worker2(node-2) - 192.168.0.152

## To do

- 쿠버네티스를 구축한다. Master 1, Worker 2
- Pod, Service, RC 개념을 이해하고 생성해본다.
- 다른 이용자가 만든 k8s 연습용 Docker Image로 부터 pod을 생성하고 외부로 연결해본다.

## Notes

- 연결 상태 보기

  ```
  kubectl get nodes
  
  #NAME     STATUS   ROLES                  AGE    VERSION
  #master   Ready    control-plane,master   163m   v1.20.1
  #node-1   Ready    <none>                 147m   v1.20.1
  #node-2   Ready    <none>                 150m   v1.20.1
  ```

- 만들어보기

  : node_port.yaml, rc.yaml 참고

  ```
  # rc.yaml 적용 및 다루기
  kubectl apply -f rc.yaml # yaml으로 rc 등록
  
  kubectl get rc # RC 조회
  kubectl get pods # Pods 조회
  kubectl describe rc kubia-rc # RC 상세보기
  kubectl describe pod kubia # Pod 상세보기
  kubectl delete rc kubia-rc # RC 삭제
  kubectl delete pod kubia # Pod 삭제
  ```

  ```
  # node_port.yaml 적용 및 다루기
  kubectl apply -f node_port.yaml # yaml으로 service 등록
  
  kubectl get services # service 조회
  #NAME         TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
  #kubernetes   ClusterIP      10.96.0.1      <none>          443/TCP        154m
  #kubia-svc    LoadBalancer   10.109.254.9   192.168.0.150   80:30036/TCP   8m8s
  
  kubectl describe service kubia-svc # service 상세보기
  kubectl delete service kubia-svc # service 삭제
  
  # 다음 요청들이 정상적이었다.
  curl 10.109.254.9:80
  curl 192.168.0.150:80 # ExternalIP가 192.168.0.150 = 10.109.254.9 느낌인듯?
  curl 192.168.0.150:30036
  curl [각 Pod의 IP]:8080
  ```

  