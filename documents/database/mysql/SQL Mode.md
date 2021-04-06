[TOC]

SQL Mode定义了MySQL应支持的sql语法、数据校验等，这样可以更容易地在不同的环境中使用MySQL。



# 1 常用的SQL Mode 

|     sql_mode值      |                             描述                             |
| :-----------------: | :----------------------------------------------------------: |
|        ANSI         | 等同于REAL_AS_FLOAT、 PIPES_AS_CONCAT、 ANSI_QUOTES、 IGNORE_SPACE和ANSI组合模式，这种模式是语法和行为更符合标准的sql |
| STRICT_TRANS_TABLES | 适用于事务表和非事务表，它是严格模式，不允许非法日期，也不允许超过字段长度的值插入字段中，对于插入不正确的值给出错误而不是警告 |
|     TRADITIONAL     | 等同于STRICT_TRANS_TABLES、 STRICT_ALL_TABLES、 NO_ZERO_IN_DATE、 NO_ZERO_DATE、 ERROR_FOR_DIVISION_BY_ZERO、 TRADITIONAL和NO_AUTO_CREATE_USER组合模式，也是严格模式，对于插入不正确的值会给出错误而不是警告。可以应用在事务表和非事务表，用在事务表时，只要出现错误就会立即回滚 |



# 2 查看和设置SQL Mode

## 2.1 查看当前SQL Mode

```
select @@sql_mode;
```



## 2.2 修改SQL Mode


session表示只对本次连接生效；global表示对本次连接不生效，对后续的新连接生效。 

```
set session|global sql_mode=’模式类型’;
```

