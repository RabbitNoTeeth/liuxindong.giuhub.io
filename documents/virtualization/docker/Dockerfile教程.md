[TOC]

Docker 可以从 `Dockerfile` 文件中读取指令来构建镜像。 `Dockerfile` 是一个文本文件，它包含了所有用来组建镜像的可执行的命令。通过 `docker build` 指令可以从 `Dockerfile` 来构建镜像。



# 1 docker build

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



docker build 指令默认从当前目录下查找 Dockerfile 文件进行构建，可以通过 -f 来指定 Dockerfile 文件位置。

```
$ cd /home
$ docker build -t aaa .				# 从 /home 目录下查找 Dockerfile 文件进行构建
$ docker build -f /opt -t bbb .		# 从 /opt 目录下查找 Dockerfile 文件进行构建
```



# 2 格式

```
指令 参数
```

指令不对大小写敏感，但是还是建议使用大写格式。

Docker 按顺序执行 `Dockerfile` 中的指令。`Dockerfile` **必须以 `FROM` 指令开始**。 `FROM` 指令前可以有一个或者多个 `ARG` 指令，这些 `ARG` 指令声明了在 `FROM` 指令中用到的参数。

Dockerfile 文件中，以 `#` 开头的行被视作注释，在 docker 加载 Dockerfile 时，注释行将被忽略。 



# 3 指令

Dockerfile 支持如下指令：

- `ADD`
- `COPY`
- `ENV`
- `EXPOSE`
- `FROM`
- `LABEL`
- `STOPSIGNAL`
- `USER`
- `VOLUME`
- `WORKDIR`
- `ONBUILD`



## 3.1 ARG

声明参数，该参数作用范围为其所在的 Dockerfile 。

**格式：**

```
ARG name[=value]
```



**示例：**

1. 声明一个未赋值的参数

   ```
   ARG user
   ```

2. 声明一个参数并赋值

   ```
   ARG user=liuxindong
   ```

3. 使用参数

   ```
   ARG parent_image=jdk1.8
   FROM $parent_image
   ```

   

## 3.2 FROM

指定基础镜像（即当前镜像是基于哪个镜像构建）。



**格式：**

```
FROM [--platform=<platform>] <image> [AS <name>]
```

或者

```
FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
```

或者

```
FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```



在一个 Dockerfile 文件中，只有 `ARG` 指令能够声明在 `FROM` 指令前面。

在一个 Dockerfile 文件中，可以存在多个 `FROM` 指令，用来创建多个镜像或者作为不同的构建阶段。每个 `FROM` 指令执行，都会清除上一个 `FROM` 指令创建的所有状态。

可以在 `FROM` 指令后添加 `AS name` 来赋予构建出的镜像一个名称，在当前 Dockerfile 的后续 `FROM` 指令和 `COPY --from=<name>` 指令可以通过该名称引用到其表示的镜像。

 `tag` 或 `digest` 的值是可选的，如果未指定，那么将使用 `latest` 作为默认值。



**示例：**

在下面的示例中，`FROM` 指令和 `RUN` 指令都要引用参数 VERSION，但只有 `FROM` 指令能够成功，RUN 指令会失败，这是 `FROM` 执行后会清除其之前的状态：

```
ARG VERSION=latest
FROM busybox:$VERSION
RUN echo $VERSION > image_version
```



如果想要在多个指令中引用 FROM 指令之前声明的变量，那么可以通过再次声明不带有默认值的变量的形式：

```
ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION
RUN echo $VERSION > image_version
```



## 3.3 COPY

将宿主机中文件复制到及容器中。



`COPY` 指令有2种格式：

```
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

`<src>` 表示宿主机文件位置，`<dest>` 表示容器中文件位置，可以是绝对路径：`COPY test.txt /absoluteDir/`；也可以是相对于 `WORKDIR` 的相对路径：`COPY test.txt relativeDir/`。



**注意：**

- 如果'`<src>` 是文件，它将和其元数据一起单独复制。如果`<dest>` 以斜杠 `/` 结尾，那么将被视为一个目录，`<src>` 的内容将被写到 `<dest>/base(<src>)` 中。
- 如果指定了多个 `<src>` ，那么 `<dest>` 必须是一个目录，它必须以斜杠 `/` 结尾。
- 如果 `<dest>` 不以斜杠 `/` 结尾，那么将表示为一个文件，`<src>` 文件中的内容将被写到 `<dest>` 表示的文件中。
- 如果 `<dest>` 不存在，那么将按照 `<src>` 进行创建（ `WORKDIR` 路径下）。



## 3.4 EXPOSE

通知docker该容器在运行时需要监听的端口。



**格式：**

```
EXPOSE <port> [<port>/<protocol>...]
```



可以对端口协议进行标识，来区分是 UDP 还是 TCP，当不进行特殊标识时，默认为 TCP。如：

```
EXPOSE 8080				# 监听8080端口，tcp协议
EXPOSE 8081/tcp			# 监听8081端口，tcp协议
EXPOSE 8082/udp			# 监听8082端口，udp协议
EXPOSE 8083/tcp			# 监听8083端口，tcp协议
EXPOSE 8083/udp			# 监听8083端口，udp协议
```



**注意：**

EXPOSE 并没有公开所声明的端口，容器启动后，如果需要允许外部访问，仍需要在 `docker run` 命令时，通过 `-p` 参数来指定。如：

```
docker run -p 8080:8080 -p 8081:8081/tcp -p 8082:8082/udp ...
```



## 3.5 ENV

设置环境变量，这些环境变量在构建阶段对后续的所有指定可见并且可进行行内替换。



**格式：**

```
ENV <key>=<value> ...
```



如果某些特殊字符不经过转义，那么变量的声明将被打断。可以通过反斜杠或者双引号在变量值中使用空白字符。如：

```
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
```



可在一个`ENV`指令中声明多个变量：

```
ENV MY_NAME="John Doe" MY_DOG=Rex\ The\ Dog \
    MY_CAT=fluffy
```



通过 `ENV` 声明的变量会持久化到该镜像的容器中，可以通过 `docker inspect` 来查看，并且可通过 `docker run --env <key>=<value>` 来修改。



**建议：**如果只是在构建阶段使用的变量，那么建议通过 `ARG` 指令来声明，否则通过 `ENV` 来声明。



## 3.6 ADD

拷贝宿主机中文件、文件夹或者远程文件到镜像文件系统中。



**格式**（2种格式，第2种适用于路径中含有空格的情况）：

> --chown 只对基于linux的镜像生效，对基于windows的镜像不生效。

```
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```



`<src>`中支持通配符，匹配规则使用go语言的 [filepath.Match](http://golang.org/pkg/path/filepath#Match) 规则。例如：

```
ADD hom* /mydir/		# 拷贝所有以 hom 开头的文件
ADD hom?.txt /mydir/ 	# 拷贝所有以 hom 开头的txt文件
```



`<dest>`中路径可使用绝对路径或者相对`WORKDIR`的相对路径，如：

```
ADD test.txt opt/		# 拷贝test.txt到 WORKDIR/opt 目录中
ADD test.txt /opt/		# 拷贝test.txt到 /opt 目录中
```



对于路径中可能包含的特殊字符，需要进行转义，转移规则使用go语言的字符转移规则。如要拷贝 `arr[0].txt` 文件，那么在 ADD 指令中需要这样写：

```
ADD arr[[]0].txt /mydir/
```



所有的文件或者文件夹拷贝到镜像中后，其UID 和GID都为0，可以通过 `--chown` 来指定：

```
ADD --chown=55:mygroup files* /somedir/
ADD --chown=bin files* /somedir/
ADD --chown=1 files* /somedir/
ADD --chown=10:11 files* /somedir/
```



## 3.7 WORKDIR

为 `RUN`, `CMD`, `ENTRYPOINT`, `COPY` 和 `ADD ` 这些指令设置工作目录。



**格式：**

```
WORKDIR /path/to/workdir
```



`WORKDIR` 指令可声明多次，如果声明时使用的是相对路径，那么将表示相对于上一个 `WORKDIR` 声明的路径，比如下面的示例：

```
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

`pwd`命令运行后的输出文件所在目录为  `/a/b/c` 。



`WORKDIR` 指令可以解析 `ENV` 声明的变量，如：

```
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
RUN pwd
```

`pwd`命令运行后的输出文件所在目录为  `/path/$DIRNAME` 。



## 3.8 CMD

为容器执行提供默认行为（执行动作）。可以声明多个 `CMD` 指令，但是只有最后一个 `CMD` 指令生效。



**格式：**

- `CMD ["executable","param1","param2"]` 

  *exec* 格式，首选的格式。

- `CMD ["param1","param2"]` 

  作为 *ENTRYPOINT*  的默认参数。

- `CMD command param1 param2` 

  *shell* 格式。



exec 和 shell 格式下的 CMD 声明是不同的， 前者必须通过json字符数组的格式来声明，如：

```
CMD [ "echo", "This is a test." ]					# 在exec下运行
CMD [ "sh", "-c", "echo", "This is a test." ]		# 在shell下运行
CMD echo "This is a test."							# 在shell下运行
```



## 3.9 RUN

声明在镜像构建阶段要执行的命令，这些命令执行完成后的结果可在后续的构建过程中使用。



**格式：**

- `RUN <command>` 

  *shell* 格式，命令在shell下执行，Linux 中默认为 `/bin/sh -c` ，Windows中默认为 `cmd /S /C` 。

- `RUN ["executable", "param1", "param2"]` 

  *exec* 格式



可通过 `\` 来实现换行，如：

```
RUN /bin/bash -c 'source $HOME/.bashrc; \
echo $HOME'
```

等价于

```
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
```



**注意：**在使用json字符数组格式的声明中，要处理好字符的转义问题，如：

```
RUN ["c:\windows\system32\tasklist.exe"]
```

上述声明存在字符未转义问题，正确写法为：

```
RUN ["c:\\windows\\system32\\tasklist.exe"]
```



未完待续...
