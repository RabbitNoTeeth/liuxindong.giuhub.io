[TOC]

DML操作是指对数据库中表记录的操作，主要包括表记录的插入、更新、删除、查询，是开发人员日常使用最频繁的操作.



# 1 插入记录

插入单条记录

```
insert into 表名(字段名,字段名,字段名...) values(值,值,值...)
```



同时插入多条记录

```
insert into 表名(字段名,字段名,字段名...) values(值,值,值...), (值,值,值...), (值,值,值...)...
```



# 2 更新记录

更新单个表

```
update 表名 set 字段名=值, 字段名=值, 字段名=值... where 条件
```



同时更新多个表

```
update 表1,表2 set 表1.字段名=值, 表1.字段名=值, 表2.字段名=值... where 条件
```



# 3 删除记录

删除单表记录

```
delete from 表名 where 条件
```



同时删除多表记录

```
delete 表1,表2,表3... from 表1,表2,表3... where 条件
```



# 4 查询

## 4.1 查询所有字段

```
select * from 表名 where 条件
```



## 4.2 查询指定字段

```
select 字段名,字段名,字段名... from 表名 where 条件
```



## 4.3 去重查询

```
select distinct字段名,字段名,字段名... from 表名 where 条件
```



## 4.4 排序（默认升序）

```
select * from 表 (where 条件) order by 字段名 desc/asc
```



## 4.5 限制：limit(x,y)

x表示从第几条开始,初始为0,表示第一条; y表示选择的记录条数

```
select * from 表 (where 条件) limit(x,y)
```



## 4.6 聚合：with rollup

`select * from 表 (where 条件 group by 字段) with rollup (having 条件)`
补充：having是对聚合后的结果进行条件筛选，而where是对聚合前进行条件筛选。



## 4.7 内连接

```
select field1,field2 from table1,table2 where table1.fieldx = table2.fieldx
```



## 4.8 左连接

谁在left关键字的左边，谁的记录是全的。

```
select field1,field2 from a left join b on a.fieldx = b.fieldx
```



## 4.9 右连接

谁在right关键字的右边，谁的记录是全的。

```
select field1,field2 from a right join b on a.fieldx = b.fieldx
```



## 4.10 联合

union会将联合后的记录去重，union all则不会。

```
select * from a union select * from b
```

```
select * from a union all select * from b
```

