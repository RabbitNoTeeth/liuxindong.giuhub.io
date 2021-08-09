[TOC]

PostGIS并不是数据库，而是PostgreSQL数据库的一个扩展，它赋予了PostgreSQL对地理对象的支持，使得PostgreSQL可以作为GIS系统的空间数据库来存储、查询、处理地理空间数据。



# 1 安装



## 1.1 docker

1. 拉取镜像

   ```
   docker pull postgis/postgis
   ```

   

2. 启动容器

   > -e POSTGRES_PASSWORD=mysecretpassword                           设置数据库密码
   >
   > -p 5432:5432                                                                                      postgis默认监听5432端口，映射到宿主机5432端口
   >
   > -v /home/webgis/postgis/data:/var/lib/postgresql/data            挂载postgis数据目录
   >
   > --privileged                                                                                         解决挂载目录的权限问题

   ```
   docker run --name postgis -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -v /home/webgis/postgis/data:/var/lib/postgresql/data --privileged -d postgis/postgis
   ```

   

   容器启动成功后，可执行如下命令在docker容器中连接数据库：

   ```
   docker exec -ti postgis psql -U postgres
   ```

   

## 1.2 windows

1. [下载](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)并安装PostgreSQL（安装成功后PostgreSQL将作为windows服务默认启动）
2. [下载](http://download.osgeo.org/postgis/windows/)并安装PostGIS（建议将其安装在PostgreSQL所在目录，由于其为PostgreSQL扩展，所以安装后不需要单独启动）



## 1.3 linux

暂略



# 2 创建GIS数据库

我们已经知道，PostGIS是PostgreSQL数据库的扩展，GIS数据本质上是存储于PostgreSQL，所有，在创建GIS数据库时，我们需要先创建一个PostgreSQL数据库，然后对该数据库启用PostGIS等扩展，来使其具有存储、查询、处理空间数据的能力。



1. 创建PostgreSQL数据库

   ```
   create database dbname;
   ```

   

2. 启用PostGIS等扩展

   ```
   -- 启用PostGIS
   CREATE EXTENSION postgis;
   -- 启用光栅（仅支持PostGIS 3及以上版本）
   CREATE EXTENSION postgis_raster;
   -- 启用拓扑
   CREATE EXTENSION postgis_topology;
   -- 启用3D及其他地理算法（并不是所有发行版都支持）
   CREATE EXTENSION postgis_sfcgal;
   -- 启用模糊匹配
   CREATE EXTENSION fuzzystrmatch;
   -- 启用基于规则的标准化
   CREATE EXTENSION address_standardizer;
   -- 启用示例规则数据集
   CREATE EXTENSION address_standardizer_data_us;
   -- 启用US Tiger地理编码
   CREATE EXTENSION postgis_tiger_geocoder;
   ```

   
