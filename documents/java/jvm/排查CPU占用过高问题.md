[TOC]

记录下在工作过程中遇到的各种CPU占用过高场景下问题的排查过程。



# 场景1

先简单介绍下Java应用及服务器环境：

- Java应用

  测温数据采集程序，用于接收各市县区测温设备上报的测温数据，并发量及数据量比较大。

  基于 vert.x 开发，主要使用 vert.x 官方的 Web、RabbitMQ、WebClient、Mysql 组件。

- 服务器环境

  操作系统：Windows Server 2016

  CPU：1U，10线程

  内存：32G

  JDK：1.8

应用上线后，稳定运行时CPU占用5%左右，内存占用400M左右。但是当3天后再次查看应用状态，发现CPU占用达到80%+，下面是我的排查过程：

1. **导出线程转储文件**

   一般情况下，CPU占用过高的原因大部分由于线程引起的，比如死锁、死循环等。使用 **<a href="./JVM常用命令.html#5-jstack" target="_blank">jstack</a>** 命令导出线程转储文件。

   

2. **分析线程转储文件**

   ```
   2021-10-08 17:16:12
   Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.261-b12 mixed mode):
   
   "Thread-4487" #4580 daemon prio=5 os_prio=0 tid=0x000001d70780c800 nid=0x140c runnable [0x000000ac9f6ff000]
      java.lang.Thread.State: RUNNABLE
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll(Unknown Source)
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.access$2600(Unknown Source)
   	at sun.nio.ch.WindowsSelectorImpl$SelectThread.run(Unknown Source)
   
   "Thread-4473" #4566 daemon prio=5 os_prio=0 tid=0x000001d704070000 nid=0x1138 runnable [0x000000ac9e8ff000]
      java.lang.Thread.State: RUNNABLE
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll(Unknown Source)
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.access$2600(Unknown Source)
   	at sun.nio.ch.WindowsSelectorImpl$SelectThread.run(Unknown Source)
   
   ...(此处省略n行，这之间，都是名称为 Thread-xxx 的线程状态日志)
   
   "vert.x-internal-blocking-12" #94 prio=5 os_prio=0 tid=0x000001d778dcb000 nid=0x27f4 waiting on condition [0x000000ab818ff000]
      java.lang.Thread.State: WAITING (parking)
   	at sun.misc.Unsafe.park(Native Method)
   	- parking to wait for  <0x000000068005f308> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
   	at java.util.concurrent.locks.LockSupport.park(Unknown Source)
   	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(Unknown Source)
   	at java.util.concurrent.LinkedBlockingQueue.take(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor.getTask(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
   	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
   	at java.lang.Thread.run(Unknown Source)
   
   "vert.x-worker-thread-18" #73 prio=5 os_prio=0 tid=0x000001d775d6e800 nid=0x714 waiting on condition [0x000000ab801fe000]
      java.lang.Thread.State: WAITING (parking)
   	at sun.misc.Unsafe.park(Native Method)
   	- parking to wait for  <0x000000068001c5f0> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
   	at java.util.concurrent.locks.LockSupport.park(Unknown Source)
   	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(Unknown Source)
   	at java.util.concurrent.LinkedBlockingQueue.take(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor.getTask(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
   	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
   	at java.lang.Thread.run(Unknown Source)
   
   ...(此处省略n行，这之间，都是名称为 vert.x-xxx 的线程状态日志)
   
   "pool-10-thread-2" #58 prio=5 os_prio=0 tid=0x000001d775d62000 nid=0x2b18 waiting on condition [0x000000abfeffe000]
      java.lang.Thread.State: TIMED_WAITING (parking)
   	at sun.misc.Unsafe.park(Native Method)
   	- parking to wait for  <0x0000000680014a70> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
   	at java.util.concurrent.locks.LockSupport.parkNanos(Unknown Source)
   	at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(Unknown Source)
   	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(Unknown Source)
   	at java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor.getTask(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
   	at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
   	at java.lang.Thread.run(Unknown Source)
   
   ...(此处省略n行，这之间，都是名称为 pool-xxx 的线程状态日志)
   
   "AMQP Connection 127.0.0.1:5672" #54 prio=5 os_prio=0 tid=0x000001d7759bf800 nid=0x242c runnable [0x000000abfeefe000]
      java.lang.Thread.State: RUNNABLE
   	at java.net.SocketInputStream.socketRead0(Native Method)
   	at java.net.SocketInputStream.socketRead(Unknown Source)
   	at java.net.SocketInputStream.read(Unknown Source)
   	at java.net.SocketInputStream.read(Unknown Source)
   	at java.io.BufferedInputStream.fill(Unknown Source)
   	at java.io.BufferedInputStream.read(Unknown Source)
   	- locked <0x0000000680016ea0> (a java.io.BufferedInputStream)
   	at java.io.DataInputStream.readUnsignedByte(Unknown Source)
   	at com.rabbitmq.client.impl.Frame.readFrom(Frame.java:91)
   	at com.rabbitmq.client.impl.SocketFrameHandler.readFrame(SocketFrameHandler.java:184)
   	- locked <0x0000000680016ec8> (a java.io.DataInputStream)
   	at com.rabbitmq.client.impl.AMQConnection$MainLoop.run(AMQConnection.java:665)
   	at java.lang.Thread.run(Unknown Source)
   
   ...(此处省略n行，这之间，都是名称为 AMQP Connection xxx 的线程状态日志)
   
   "Service Thread" #10 daemon prio=9 os_prio=0 tid=0x000001d774f71800 nid=0x154 runnable [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "C1 CompilerThread3" #9 daemon prio=9 os_prio=2 tid=0x000001d773a4e000 nid=0xba0 waiting on condition [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "C2 CompilerThread2" #8 daemon prio=9 os_prio=2 tid=0x000001d773a43000 nid=0x29f4 waiting on condition [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "C2 CompilerThread1" #7 daemon prio=9 os_prio=2 tid=0x000001d773a40000 nid=0x2a30 waiting on condition [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "C2 CompilerThread0" #6 daemon prio=9 os_prio=2 tid=0x000001d773a3a800 nid=0x2924 waiting on condition [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "Attach Listener" #5 daemon prio=5 os_prio=2 tid=0x000001d7739ec800 nid=0x1810 waiting on condition [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "Signal Dispatcher" #4 daemon prio=9 os_prio=2 tid=0x000001d7739eb800 nid=0x2ae4 runnable [0x0000000000000000]
      java.lang.Thread.State: RUNNABLE
   
   "Finalizer" #3 daemon prio=8 os_prio=1 tid=0x000001d7739c4800 nid=0x2bd0 in Object.wait() [0x000000abfbbff000]
      java.lang.Thread.State: WAITING (on object monitor)
   	at java.lang.Object.wait(Native Method)
   	at java.lang.ref.ReferenceQueue.remove(Unknown Source)
   	- locked <0x000000068004d8e8> (a java.lang.ref.ReferenceQueue$Lock)
   	at java.lang.ref.ReferenceQueue.remove(Unknown Source)
   	at java.lang.ref.Finalizer$FinalizerThread.run(Unknown Source)
   
   "Reference Handler" #2 daemon prio=10 os_prio=2 tid=0x000001d77399a000 nid=0x10ec in Object.wait() [0x000000abfbafe000]
      java.lang.Thread.State: WAITING (on object monitor)
   	at java.lang.Object.wait(Native Method)
   	at java.lang.Object.wait(Unknown Source)
   	at java.lang.ref.Reference.tryHandlePending(Unknown Source)
   	- locked <0x000000068018edf8> (a java.lang.ref.Reference$Lock)
   	at java.lang.ref.Reference$ReferenceHandler.run(Unknown Source)
   
   "VM Thread" os_prio=2 tid=0x000001d773994800 nid=0x276c runnable 
   
   "GC task thread#0 (ParallelGC)" os_prio=0 tid=0x000001d756e24000 nid=0x24c runnable 
   
   "GC task thread#1 (ParallelGC)" os_prio=0 tid=0x000001d756e26800 nid=0x8fc runnable 
   
   "GC task thread#2 (ParallelGC)" os_prio=0 tid=0x000001d756e28000 nid=0x29a4 runnable 
   
   "GC task thread#3 (ParallelGC)" os_prio=0 tid=0x000001d756e2a000 nid=0x2b08 runnable 
   
   "GC task thread#4 (ParallelGC)" os_prio=0 tid=0x000001d756e2b000 nid=0x2af8 runnable 
   
   "GC task thread#5 (ParallelGC)" os_prio=0 tid=0x000001d756e2c800 nid=0x1964 runnable 
   
   "GC task thread#6 (ParallelGC)" os_prio=0 tid=0x000001d756e2f800 nid=0x8a4 runnable 
   
   "GC task thread#7 (ParallelGC)" os_prio=0 tid=0x000001d756e30800 nid=0x264c runnable 
   
   "GC task thread#8 (ParallelGC)" os_prio=0 tid=0x000001d756e31800 nid=0x2b54 runnable 
   
   "VM Periodic Task Thread" os_prio=2 tid=0x000001d774f85000 nid=0x164c waiting on condition 
   
   JNI global references: 880	
   ```

   上述是线程转储日志中的部分内容，通过分析程序代码，所有以 `vert.x-`、`AMOP Connection`、`pool-` 为前缀的线程都是程序内创建并且维护的，也就是合理的，日志结尾部分 `Service Thread`、`C1 CompilerThread`、`Attach Listener`、`GC task` 等线程由jvm维护，也是合理的。

   **一个非常不合理的地方在于那些 `Thread-xxx` 名称的线程**，这些线程并不是由程序代码创建，并且数量达到了4400+，是非常明显的异常现象。

   

3. **分析导致线程大量创建的原因**

   ```
   "Thread-4487" #4580 daemon prio=5 os_prio=0 tid=0x000001d70780c800 nid=0x140c runnable [0x000000ac9f6ff000]
      java.lang.Thread.State: RUNNABLE
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.poll(Unknown Source)
   	at sun.nio.ch.WindowsSelectorImpl$SubSelector.access$2600(Unknown Source)
   	at sun.nio.ch.WindowsSelectorImpl$SelectThread.run(Unknown Source)
   ```

   查看异常线程的详细堆栈信息，发现其发生位置在 `sun.nio.ch.WindowsSelectorImpl` 类，在经过查找相关资料后，确认该类为jdk的nio模型在windows系统上的实现，分析其源码（详细可参考 https://blog.csdn.net/liu_005/article/details/86253576 ）后发现它的工作原理简单解释为：在windows平台上，通过辅助线程来管理nio模型中channel的注册和注销，一个辅助线程管理一定数量的channel，channel数量越大，就会创建更多的辅助线程；当channel数量减少，也会销毁对应的辅助线程。

   

   而jdk在这里存在辅助线程可能一直创建，无法销毁的bug，这个bug最早在jdk1.6版本中就被提出来了，查找资料后发现直到1.8版本也没有真正修复，只是发生的概率更小。恰好，这个程序所使用的 vert.x 是基于netty构建的，也就是nio模型。

   

4. **选择解决方案**

   我能想到的解决方案有以下3种：

   - 更换Linux服务器
   - 重构应用代码，不再使用nio
   - 更新JDK

   结合实际情况，第三种方式是目前最合适的选择，所以我将服务器的jdk版本由1.8升级到了11，但是依然不确定jdk11是否完全修复了这个bug，所以还要持续地观察应用状态。

