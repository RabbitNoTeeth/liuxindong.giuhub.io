RabbitMQ服务崩溃会生成dump转储文件 `erl_crash.dump` ，如果没有手动修改过RabbitMQ的日志存储位置配置，那么在Linux系统中，该文件位于 `/var/log/rabbitmq` ，在Windows系统，该文件位于 `C:\Users\Administrator\AppData\Roaming\RabbitMQ\log` 。



要分析该dump文件，可以使用开源工具 **erl_crashdump_analyzer.sh**（[直接下载](./resources/script/erl_crashdump_analyzer.sh)｜[访问源文件](https://github.com/ferd/recon/blob/master/script/erl_crashdump_analyzer.sh)） 进行分析。

```
./erl_crashdump_analyzer.sh erl_crash.dump
```



回车执行后，命令行将打印分析结果，其中 **Slogan:** 后的描述即为导致RabbitMQ崩溃的根本原因，如下示例：

```
nalyzing erl_crash.dump, generated on:  Sat Sep 11 20:53:59 2021

Slogan: eheap_alloc: Cannot allocate 371376 bytes of memory (of type "heap").

Memory:
===
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  processes:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  processes_used:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  system:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  atom:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  atom_used:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  binary:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  code:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  ets:  Mb
/(1024*1024)")syntax error: invalid arithmetic operator (error token is "
  ---
  total:  Mb

Different message queue lengths (5 largest different):
===
   1 10
 397 0

Error logger queue length:
===

File descriptors open:
===
  UDP:  1
  TCP:  5
  Files:  1
  ---
  Total:  7

Number of processes:
===
     398

Processes Heap+Stack memory sizes (words) used in the VM (5 largest different):
===
   1 46422
   2 28690
   1 17731
   1 10958
   4 6772

Processes OldHeap memory sizes (words) used in the VM (5 largest different):
===
   1 196650
   1 121536
   2 75113
   2 46422
   2 17731

Process States when crashing (sum):
===
   1 CONNECTED
   2 CONNECTED|BINARY_IO
   6 CONNECTED|BINARY_IO|PORT_LOCK
   2 CONNECTED|BINARY_IO|SOFT_EOF
   1 Current Process Garbing
   1 Current Process Internal ACT_PRIO_NORMAL | USR_PRIO_NORMAL | PRQ_PRIO_NORMAL | ACTIVE | RUNNING | GC
   1 Garbing
   1 Internal ACT_PRIO_HIGH | USR_PRIO_HIGH | PRQ_PRIO_HIGH
   1 Internal ACT_PRIO_HIGH | USR_PRIO_HIGH | PRQ_PRIO_HIGH | OFF_HEAP_MSGQ
   1 Internal ACT_PRIO_LOW | USR_PRIO_LOW | PRQ_PRIO_LOW
   5 Internal ACT_PRIO_MAX | USR_PRIO_MAX | PRQ_PRIO_MAX
   1 Internal ACT_PRIO_MAX | USR_PRIO_MAX | PRQ_PRIO_MAX | OFF_HEAP_MSGQ
 374 Internal ACT_PRIO_NORMAL | USR_PRIO_NORMAL | PRQ_PRIO_NORMAL
   1 Internal ACT_PRIO_NORMAL | USR_PRIO_NORMAL | PRQ_PRIO_NORMAL | ACTIVE | RUNNING | GC
  14 Internal ACT_PRIO_NORMAL | USR_PRIO_NORMAL | PRQ_PRIO_NORMAL | OFF_HEAP_MSGQ
 397 Waiting
```

