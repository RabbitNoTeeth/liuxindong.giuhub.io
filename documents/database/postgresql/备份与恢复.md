[TOC]

PostgreSQL提供以下三种备份方式，每种方式都有其优缺点，结合实际需求进行选择

1. SQL转储
2. 文件系统级备份
3. 持续归档



# 1 SQL转储

## 1.1 备份

### 1.1.1 pg_dump

```
pg_dump dbname > dumpfile
```



**详解：**

-  `pg_dump` 命令执行后会生成目标数据库的转储文件。
-  `pg_dump` 默认使用执行该命令的用户来连接数据库，可以通过 `-U user` 来指定特定用户。
-  `pg_dump` 可通过 `-n schema` 或者 `-t table` 来对指定表进行备份。
-  `pg_dump` 可通过 `-h host` 和 `-p port` 参数来对远程数据库进行备份。
-  `pg_dump` 其实就是PostgreSQL客户端，执行时需要其所使用的用户具有相应数据库或者表的读权限，否则会失败。



**优点：**

 `pg_dump` 的优点是其他两种方式所不具备的，那就是它生成的转储文件适用于不同版本的PostgreSQL，也适用于不同架构的服务器（如32位和64位）。



**缺点：**

 `pg_dump` 生成的转储文件是数据库在某一时刻的快照，无法保证与转储完成时刻的数据库中数据一致。同时，在命令执行时，如果执行如`ALTER TABLE`命令，那么将会出现异常。

 `pg_dump` 只能对一个数据库进行备份，并且不会备份该数据库的角色和表空间信息。



### 1.1.2 pg_dumpall

```
pg_dumpall > dumpfile
```



**详解：**

-  `pg_dumpall` 对当前连接下的所有数据库进行备份，包括数据库的角色和表空间信息。
-  `pg_dumpall` 的执行需要当前用户具有超级管理员权限。
-  `pg_dumpall` 默认备份集群中所有节点的数据，可以通过 `--globals-only`  来对对集群中某一节点进行单独备份。
-  `pg_dumpall` 形成的转储文件在恢复时，将重新创建所有角色、权限、表空间等信息，在恢复前要慎重考虑。



## 1.2 恢复

```
psql dbname < dumpfile
```



**详解：**

- 将指定转储文件dumpfile中的数据还原到指定数据库dbname中。
- 当要恢复的数据库dbname不存在时，需要先手动创建，以及配置好相应的权限。
- 默认情况下，该命令执行时如果遇到错误，不会停止，将继续执行。可以通过 `--set ON_ERROR_STOP=on` 参数来使其遇到错误时停止执行。
- 可以通过 `--single-transaction` 参数来使整个恢复过程在一个事务内，从而达到执行失败数据整体回滚的效果。（这样做有好有坏，好处在于可以保证数据的正确性，坏处在于可能一个恢复过程要耗费很长的时间）
- 该命令支持  `-h host` 、 `-p port` 、 `-U user` 等参数，从而可以实现对远程数据库进行恢复。



## 1.3 处理大型数据库

对于大型数据库，`pg_dump` 生成的转储文件可能会非常大，甚至超过某些系统的文件大小限制，可以通过以下方法来解决这个问题



### 1.3.1 压缩转储

`pg_dump` 在支持标准输出的同时，也支持使用标准的Unix压缩工具，比如gzip，来生成压缩转储：

```
pg_dump dbname | gzip > filename.gz
```



对应的压缩转储文件，可通过下面两种方式进行恢复：

```
gunzip -c filename.gz | psql dbname
```

或

```
cat filename.gz | gunzip | psql dbname
```



### 1.3.2 切割转储

`split` 命令可以将`pg_dump` 输出的转储文件按照固定大小切割成多个小文件，下面的命令表示将转储文件切割成多个2G的文件：

```
pg_dump dbname | split -b 2G - filename
```



对应的转储文件，可通过下面的方式进行恢复：

```
cat filename* | psql dbname
```



### 1.3.3 pg_dump自定义转储格式

如果PostgreSQL所在的系统安装了zlib库，那么`pg_dump` 在生成转储文件时将自动进行压缩，压缩后的文件大小与使用gzip压缩差不多，但是它有一个额外的优势就是可以选择性的恢复表。

```
pg_dump -Fc dbname > filename
```



自定义格式的转储文件只能通过 `pg_restore` 命令进行恢复：

```
pg_restore -d dbname filename
```



:star2: 对于非常大的数据库，可以将切割转储与其他两种方式结合使用。



### 1.3.4 pg_dump并行转储

可以通过 `pg_dump` 的并行转储模式来加速转储速度，该模式下，将同时对多张表进行转储。 可以通过 `-j` 参数来控制并行度，并行转储仅支持以目录格式输出：

```
pg_dump -j num -F d -f out.dir dbname
```



可以使用  `pg_restore -j` 来并行恢复，该命令适用于上面所有方法形成的转储文件。



# 2 文件系统级别备份

直接备份PostgreSQL数据目录（注意：PostgreSQL的文件目录不一定是 `/usr/local/pgsql/data`，可以通过查看配置文件 `postgresql.conf` 确定）：

```
tar -cf backup.tar /usr/local/pgsql/data
```



需要恢复数据库只需要用备份好的目录进行覆盖即可。



**:heavy_exclamation_mark: 注意：**

- 该方式备份和还原数据库时，必须关闭PostgreSQL。
- 该方式还原数据库时，无法选择性还原。这是因为只有指定的数据文件，但是没有相应的事务提交日志 `pg_xact/*` 是不行的，而事务提交日志是一个整体，无法选择性拆分。



# 3 连续归档

PostgreSQL通过 **WAL**（ write ahead log）文件来记录数据库的每一个变化，如果PostgreSQL发生崩溃，那么可以“回放”WAL文件来使其恢复到最后检查点的状态，利用这个特性，通过定期的文件系统备份以及WAL备份，可以实现任意时间点的数据备份和恢复。



## 备份

1. 修改配置文件 `postgresql.conf` 

   启用 WAL

   ```
   wal_level = replica
   archive_mode = on
   ```

   配置归档命令

   ```
   archive_command = 'test ! -f /home/postgresql/archive/%f && cp %p /home/postgresql/archive/%f'
   ```

2. 创建基础备份

   通过 `pg_basebackup` 命令创建基础备份。



## 恢复

1. 停止PostgreSQL。

2. 复制PostgreSQL数据目录到一个临时目录中。

3. 删除PostgreSQL数据目录。

4. 将临时目录中复制出来的PostgreSQL数据目录放入到其原来的位置。

5. 清空pg_wal目录中的文件。

6. 将想要还原的时间点的WAL文件放入pg_wal目录中。

   如果想要还原最新的，可以使用第2步中拷贝出的pg_wal目录下的文件；如果想要还原到更早时间，那么使用WAL归档中的文件。

7. 在PostgreSQL数据目录下创建名称为 `recovery.signal` 的文件。

8. 启动PostgreSQL，如果一切顺利，恢复完成后将自动删除第7步中创建的  `recovery.signal` 文件。

9. 检查数据库状态是否与预期一致，如果不一致，回到步骤1，仔细检查，重新恢复。

