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



未完待续...
