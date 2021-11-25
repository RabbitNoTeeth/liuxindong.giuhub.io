[TOC]



# 安装

PostgreSQL 可以从 Ubuntu 主存储库中获取，但是不一定是最新版本，可以通过如下命令进行查看：

```
apt show postgresql
```

根据所显示的信息，可以自主决定是安装 Ubuntu 提供的版本还是获取 PostgreSQL 的最新发行版，下面会分别介绍这两种方式。



## 主存储库版本

执行命令：

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```



## 最新发行版

1. 添加GPG 密钥

   ```
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   ```

2. 添加存储库

   ```
   sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
   ```

3. 安装

   ```
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```



# 初始化配置

1. 检查PostgreSQL状态

   ```
   service postgresql status
   ```

2. 切换postgres用户（默认情况下，PostgreSQL 会创建一个拥有所权限的特殊用户 `postgres`，要使用 PostgreSQL，必须先登录该用户）

   ```
   sudo su postgres
   ```

3. 启动 PostgreSQL Shell

   ```
   psql
   ```

4. 修改用户postgres的密码（此处的postgres表示PostgreSQL中的用户，除此之外，可以修改任何PostgreSQL用户的密码）

   ```
   ALTER USER postgres WITH PASSWORD 'my_password';
   ```

5. 测试postgres用户连接

   ```
   psql -U postgres -d postgres
   ```

   :bell: 如果遇到错误：`psql: FATAL:  Peer authentication failed for user "postgres"`，那么通过root用户修改配置文件 `/etc/postgresql/11/main/pg_hba.conf`

   ```
   将
   local   all             postgres                                peer
   修改为
   local   all             postgres                                md5
   ```

6. 重启

   ```
   sudo service postgresql restart
   ```

   

# 设置允许远程访问

1. 修改配置文件 `/etc/postgresql/版本号/main/postgresql.conf`，编辑或者添加下面一行，使PostgreSQL可以接受来自任意IP的连接请求。

   ```
   listen_addresses = '*'
   ```

2. 修改配置文件 `/etc/postgresql/版本号/main/pg_hba.conf`，编辑或者添加下面一行，使PostgreSQL可以对任意IP进行密码验证。

   ```
   host all all 0.0.0.0/0 md5
   ```

3. 重启

   ```
   sudo service postgresql restart
   ```

   