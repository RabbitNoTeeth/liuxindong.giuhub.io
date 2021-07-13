[TOC]

# 1 MySQL 5.x

```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```



# 2 MySQL 8

```
alter user user() identified by '密码';
update user set host = '%' where user = 'root';
ALTER USER 'root'@'%' IDENTIFIED BY '密码' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '密码';
```

