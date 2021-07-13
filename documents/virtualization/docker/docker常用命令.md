[TOC]



# 1 容器生命周期管理

## 1.1 run

创建一个新的容器并运行一个命令

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```



**Options：**

```
      --add-host list                         Add a custom host-to-IP mapping (host:ip) (default [])
  -a, --attach list                           Attach to STDIN, STDOUT or STDERR (default [])
      --blkio-weight uint16                   Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0)
      --blkio-weight-device weighted-device   Block IO weight (relative device weight) (default [])
      --cap-add list                          Add Linux capabilities (default [])
      --cap-drop list                         Drop Linux capabilities (default [])
      --cgroup-parent string                  Optional parent cgroup for the container
      --cidfile string                        Write the container ID to the file
      --cpu-count int                         CPU count (Windows only)
      --cpu-percent int                       CPU percent (Windows only)
      --cpu-period int                        Limit CPU CFS (Completely Fair Scheduler) period
      --cpu-quota int                         Limit CPU CFS (Completely Fair Scheduler) quota
      --cpu-rt-period int                     Limit CPU real-time period in microseconds
      --cpu-rt-runtime int                    Limit CPU real-time runtime in microseconds
  -c, --cpu-shares int                        CPU shares (relative weight)
      --cpus decimal                          Number of CPUs (default 0.000)
      --cpuset-cpus string                    CPUs in which to allow execution (0-3, 0,1)
      --cpuset-mems string                    MEMs in which to allow execution (0-3, 0,1)
      --credentialspec string                 Credential spec for managed service account (Windows only)
  -d, --detach                                Run container in background and print container ID
      --detach-keys string                    Override the key sequence for detaching a container
      --device list                           Add a host device to the container (default [])
      --device-read-bps throttled-device      Limit read rate (bytes per second) from a device (default [])
      --device-read-iops throttled-device     Limit read rate (IO per second) from a device (default [])
      --device-write-bps throttled-device     Limit write rate (bytes per second) to a device (default [])
      --device-write-iops throttled-device    Limit write rate (IO per second) to a device (default [])
      --disable-content-trust                 Skip image verification (default true)
      --dns list                              Set custom DNS servers (default [])
      --dns-option list                       Set DNS options (default [])
      --dns-search list                       Set custom DNS search domains (default [])
      --entrypoint string                     Overwrite the default ENTRYPOINT of the image
  -e, --env list                              Set environment variables (default [])
      --env-file list                         Read in a file of environment variables (default [])
      --expose list                           Expose a port or a range of ports (default [])
      --group-add list                        Add additional groups to join (default [])
      --health-cmd string                     Command to run to check health
      --health-interval duration              Time between running the check (ns|us|ms|s|m|h) (default 0s)
      --health-retries int                    Consecutive failures needed to report unhealthy
      --health-timeout duration               Maximum time to allow one check to run (ns|us|ms|s|m|h) (default 0s)
      --help                                  Print usage
  -h, --hostname string                       Container host name
      --init                                  Run an init inside the container that forwards signals and reaps processes
      --init-path string                      Path to the docker-init binary
  -i, --interactive                           Keep STDIN open even if not attached
      --io-maxbandwidth string                Maximum IO bandwidth limit for the system drive (Windows only)
      --io-maxiops uint                       Maximum IOps limit for the system drive (Windows only)
      --ip string                             Container IPv4 address (e.g. 172.30.100.104)
      --ip6 string                            Container IPv6 address (e.g. 2001:db8::33)
      --ipc string                            IPC namespace to use
      --isolation string                      Container isolation technology
      --kernel-memory string                  Kernel memory limit
  -l, --label list                            Set meta data on a container (default [])
      --label-file list                       Read in a line delimited file of labels (default [])
      --link list                             Add link to another container (default [])
      --link-local-ip list                    Container IPv4/IPv6 link-local addresses (default [])
      --log-driver string                     Logging driver for the container
      --log-opt list                          Log driver options (default [])
      --mac-address string                    Container MAC address (e.g. 92:d0:c6:0a:29:33)
  -m, --memory string                         Memory limit
      --memory-reservation string             Memory soft limit
      --memory-swap string                    Swap limit equal to memory plus swap: '-1' to enable unlimited swap
      --memory-swappiness int                 Tune container memory swappiness (0 to 100) (default -1)
      --name string                           Assign a name to the container
      --network string                        Connect a container to a network (default "default")
      --network-alias list                    Add network-scoped alias for the container (default [])
      --no-healthcheck                        Disable any container-specified HEALTHCHECK
      --oom-kill-disable                      Disable OOM Killer
      --oom-score-adj int                     Tune host's OOM preferences (-1000 to 1000)
      --pid string                            PID namespace to use
      --pids-limit int                        Tune container pids limit (set -1 for unlimited)
      --privileged                            Give extended privileges to this container
  -p, --publish list                          Publish a container's port(s) to the host (default [])
  -P, --publish-all                           Publish all exposed ports to random ports
      --read-only                             Mount the container's root filesystem as read only
      --restart string                        Restart policy to apply when a container exits (default "no")
      --rm                                    Automatically remove the container when it exits
      --runtime string                        Runtime to use for this container
      --security-opt list                     Security Options (default [])
      --shm-size string                       Size of /dev/shm, default value is 64MB
      --sig-proxy                             Proxy received signals to the process (default true)
      --stop-signal string                    Signal to stop a container, SIGTERM by default (default "SIGTERM")
      --stop-timeout int                      Timeout (in seconds) to stop a container
      --storage-opt list                      Storage driver options for the container (default [])
      --sysctl map                            Sysctl options (default map[])
      --tmpfs list                            Mount a tmpfs directory (default [])
  -t, --tty                                   Allocate a pseudo-TTY
      --ulimit ulimit                         Ulimit options (default [])
  -u, --user string                           Username or UID (format: <name|uid>[:<group|gid>])
      --userns string                         User namespace to use
      --uts string                            UTS namespace to use
  -v, --volume list                           Bind mount a volume (default [])
      --volume-driver string                  Optional volume driver for the container
      --volumes-from list                     Mount volumes from the specified container(s) (default [])
  -w, --workdir string                        Working directory inside the container
```



## 1.2 rm

删除一个或者多个容器。

```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```



**Options:**

```
  -f, --force     Force the removal of a running container (uses SIGKILL)
      --help      Print usage
  -l, --link      Remove the specified link
  -v, --volumes   Remove the volumes associated with the container
```



## 1.3 stop 

停止一个或者多个正在运行的容器

```
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```



**Options:**

```
      --help       Print usage
  -t, --time int   Seconds to wait for stop before killing it (default 10)
```



## 1.4 start

启动一个或者多个停止状态的容器

```
docker start [OPTIONS] CONTAINER [CONTAINER...]
```



**Options:**

```
  -a, --attach               Attach STDOUT/STDERR and forward signals
      --detach-keys string   Override the key sequence for detaching a container
      --help                 Print usage
  -i, --interactive          Attach container's STDIN
```



## 1.5 restart

重启一个或者多个容器

```
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```



**Options:**

```
      --help       Print usage
  -t, --time int   Seconds to wait for stop before killing the container (default 10)
```



## 1.6 exec

在运行的容器中执行指令

```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```



Options:

```
  -d, --detach               Detached mode: run command in the background
      --detach-keys string   Override the key sequence for detaching a container
  -e, --env list             Set environment variables (default [])
      --help                 Print usage
  -i, --interactive          Keep STDIN open even if not attached
      --privileged           Give extended privileges to the command
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or UID (format: <name|uid>[:<group|gid>])
```



**示例**：进入容器shell命令行

```
docker exec -i -t  容器 /bin/bash
```





# 2 容器操作

## 2.1 ps

列出容器

```
docker ps [OPTIONS]
```



**Options:**

```
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
      --help            Print usage
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display numeric IDs
  -s, --size            Display total file sizes
```



# 3 本地镜像管理

## 3.1 save

将指定镜像保存成 tar 归档文件。

```
docker save [OPTIONS] IMAGE [IMAGE...]
```



**Options:**

```
      --help            Print usage
  -o, --output string   Write to a file, instead of STDOUT
```



## 3.2 load

导入使用 docker save 命令导出的镜像。

```
docker load [OPTIONS]
```



**Options:**

```
      --help           Print usage
  -i, --input string   Read from tar archive file, instead of STDIN
  -q, --quiet          Suppress the load output
```



## 3.3 rmi

删除一个或者多个镜像。

```
docker rmi [OPTIONS] IMAGE [IMAGE...]
```



**Options:**

```
  -f, --force      Force removal of the image
      --help       Print usage
      --no-prune   Do not delete untagged parents
```



## 3.4 build

从Dockerfile构建镜像

```
docker build [OPTIONS] PATH | URL | -
```



**Options:**

```
      --build-arg list             Set build-time variables (default [])
      --cache-from stringSlice     Images to consider as cache sources
      --cgroup-parent string       Optional parent cgroup for the container
      --compress                   Compress the build context using gzip
      --cpu-period int             Limit the CPU CFS (Completely Fair Scheduler) period
      --cpu-quota int              Limit the CPU CFS (Completely Fair Scheduler) quota
  -c, --cpu-shares int             CPU shares (relative weight)
      --cpuset-cpus string         CPUs in which to allow execution (0-3, 0,1)
      --cpuset-mems string         MEMs in which to allow execution (0-3, 0,1)
      --disable-content-trust      Skip image verification (default true)
  -f, --file string                Name of the Dockerfile (Default is 'PATH/Dockerfile')
      --force-rm                   Always remove intermediate containers
      --help                       Print usage
      --isolation string           Container isolation technology
      --label list                 Set metadata for an image (default [])
  -m, --memory string              Memory limit
      --memory-swap string         Swap limit equal to memory plus swap: '-1' to enable unlimited swap
      --network string             Set the networking mode for the RUN instructions during build (default "default")
      --no-cache                   Do not use cache when building the image
      --pull                       Always attempt to pull a newer version of the image
  -q, --quiet                      Suppress the build output and print image ID on success
      --rm                         Remove intermediate containers after a successful build (default true)
      --security-opt stringSlice   Security options
      --shm-size string            Size of /dev/shm, default value is 64MB
  -t, --tag list                   Name and optionally a tag in the 'name:tag' format (default [])
      --ulimit ulimit              Ulimit options (default [])
  -v, --volume list                Set build-time bind mounts (default [])
```



未完待续...
