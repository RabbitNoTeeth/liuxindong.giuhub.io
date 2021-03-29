[TOC]

DDL是数据定义语言的缩写,简单来说,就是对数据库内部的对象进行创建/删除/修改等操作的语句.



# 1 创建数据库

```
create database 库名;
```



# 2 删除数据库

```
drop database 库名;
```



# 3 创建表

```
create table 表名;
```



# 4 查看表结构

```
desc 表名;
```



# 5 查看表创建语句及其他信息(存储引擎,字符集等)

```
show create table 表名 \G;
```



# 6 删除表

```
drop table 表名;
```



# 7 修改表

## 7.1 更改字段类型

```
alter table 表名 modify 字段名 新数据类型;
```



## 7.2 增加字段

```
alter table 表名 add column 字段名 数据类型;
```



## 7.3 删除字段

```
alter table 表名 drop column 字段名;
```



## 7.4 更改字段名

```
alter table 表名 change 字段名 新字段名 数据类型;
```



## 7.5 更改字段排列顺序

**适用于新增字段**。



将新增字段放到指定字段后面

```
alter table 表名 add 新字段名 数据类型 after 指定字段名;
```



将新增字段放在最前面

```
alter table 表名 add 新字段名 数据类型 first;
```