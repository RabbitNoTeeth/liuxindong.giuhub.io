在云服务器（Linux）安装了PostgreSQL后，发现使用Dbeaver、Navicat、DataGrip、PgAdmin等数据库工具连接数据库时，隔几分钟就会自动断开连接。



关于这个问题，可以尝试修改系统的TCP keepalive配置来解决：

1. 查看当前配置

   ```
   # sysctl -A | grep net.ipv4.tcp_keepalive
   net.ipv4.tcp_keepalive_intvl = 75      # 第一次keep alive请求发送后，不活动连接的时间
   net.ipv4.tcp_keepalive_probes = 9      # 连接被认为是断开之前，keep alive请求被重发的次数
   net.ipv4.tcp_keepalive_time = 7200     # keep alive探测的时间间隔
   ```

2. 修改配置，让pg更频繁地发出探测数据包来保持TCP连接

   ```
   # sysctl -w net.ipv4.tcp_keepalive_time=60 net.ipv4.tcp_keepalive_probes=3 net.ipv4.tcp_keepalive_intvl=10
   ```

   

