[TOC]



# 1 异常日志

```
2019-07-17 21:44:51 16dc InnoDB: uncompressed page, stored checksum in field1 932012804, calculated checksums for field1: crc32 1399613296, innodb 1819879241, none 3735928559, stored checksum in field2 2171367603,
calculated checksums for field2: crc32 1399613296, innodb 3257210795, none 3735928559, page LSN 3 1812309438, low 4 bytes of LSN at page end 752093164, page number (if stored to page already) 694, 
space id (if created with >= MySQL-4.1.1 and stored already) 0
InnoDB: Page may be an index page where index id is 18446744069414584320
InnoDB: (index "CLUST_IND" of table "SYS_IBUF_TABLE")
InnoDB: Database page corruption on disk or a failed
InnoDB: file read of page 694.
InnoDB: You may have to recover from a backup.
InnoDB: It is also possible that your operating
InnoDB: system has corrupted its own file cache
InnoDB: and rebooting your computer removes the
InnoDB: error.
InnoDB: If the corrupt page is an index page
InnoDB: you can also try to fix the corruption
InnoDB: by dumping, dropping, and reimporting
InnoDB: the corrupt table. You can use CHECK
InnoDB: TABLE to scan your table for corruption.
InnoDB: See also http://dev.mysql.com/doc/refman/5.6/en/forcing-innodb-recovery.html
InnoDB: about forcing recovery.
InnoDB: Ending processing because of a corrupt database page.
2019-07-17 21:44:51 16dc  InnoDB: Assertion failure in thread 5852 in file buf0buf.cc line 4295
InnoDB: We intentionally generate a memory trap.
InnoDB: Submit a detailed bug report to http://bugs.mysql.com.
InnoDB: If you get repeated assertion failures or crashes, even
InnoDB: immediately after the mysqld startup, there may be
InnoDB: corruption in the InnoDB tablespace. Please refer to
InnoDB: http://dev.mysql.com/doc/refman/5.6/en/forcing-innodb-recovery.html
InnoDB: about forcing recovery.
2019-07-18 08:42:06 3740 [Warning] Buffered warning: option 'table_open_cache': unsigned value 0 adjusted to 1
```

日志显示innodb表出现坏页，导致数据库崩溃。有时候日志中可以提示出出现坏页的表名，但是有时候提出不出。



# 2 解决方式

设置 my.ini 中 `innodb_force_recovery` 参数的值，该参数默认值为0，表示不开启该特性。

其可选值还有1~6，较大的值包含了较小值的功能特性，比如设置为3后，包含了1和2代表的功能特性。

如果 `innodb_force_recovery` 设置为3或者以下，那么能够安全地转储数据，只会有部分坏页中数据的丢失 ；4及以上会引起数据文件的永久损坏；6是最极端的设置，因为数据库页处于过时的状态，这可能会给b树和其他数据库结构带来更多的破坏。



**非零值详解：**

- 1 (SRV_FORCE_IGNORE_CORRUPT)

  忽略坏页，如执行 `SELECT * FROM tbl_name` 会跳过损坏的页。

- 2 (SRV_FORCE_NO_BACKGROUND)

  防止主线程和任何清除线程运行。如果在清除操作期间会发生崩溃，则此恢复值可以防止崩溃。

- 3 (SRV_FORCE_NO_TRX_UNDO)

  崩溃恢复后不运行事务回滚。

- 4 (SRV_FORCE_NO_IBUF_MERGE)

  防止插入缓冲区合并操作。如果它们会导致崩溃，就不要这样做。不计算表统计数据。此值可能永久损坏数据文件。使用此值后，准备删除并重新创建所有二级索引。从MySQL 5.6.15开始，将InnoDB设置为只读。

- 5 (SRV_FORCE_NO_UNDO_LOG_SCAN)

  启动数据库时不查看撤消日志，InnoDB甚至将未完成的事务视为已提交。此值可能永久损坏数据文件。从MySQL 5.6.15开始，将InnoDB设置为只读。

- 6 (SRV_FORCE_NO_LOG_REDO)

  执行与恢复相关的重做日志前滚。此值可能永久损坏数据文件。使数据库页面处于过时状态，从而可能会对b树和其他数据库结构引入更多破坏。从MySQL 5.6.15开始，将InnoDB设置为只读。

`innodb_force_recovery` 设置为3及以下时，可以创建和删除表格，MySql5.6.27版本后，3以上也支持删除表格。

如果确定指定表在回滚前会引起崩溃，那么可以删除它。如果遇到由失败的import或ALTER表导致的失控回滚，可以终止 mysqld 进程，并将`innodb_force_recovery`设置为3，以便在不回滚的情况下启动数据库，然后删除导致失控回滚的表。

如果表数据中的损坏阻止转储整个表的内容，那么使用`ORDER BY primary_key DESC`子句的查询可能能够成功转储坏页之后的数据。

如果启动InnoDB需要一个较高的`innodb_force_recovery`值，那么可能会有损坏的数据结构导致复杂的查询（包含WHERE、ORDER BY或其他子句的查询）失败。在这种情况下，可能只能运行基本的`SELECT * FROM t`查询。



[点击查看MySQL官方关于此问题的解决文档](https://dev.mysql.com/doc/refman/5.6/en/forcing-innodb-recovery.html)