最近，RabbitMQ服务频繁出现 handshake_timeout 异常，导致消费端应用（java程序）重连使cpu占用不断上涨，从而导致cpu长时间满载，服务器宕机。



相关RabbitMQ日志输出如下：

```
2021-09-28 12:04:24.867000+08:00 [error] <0.5969.6> closing AMQP connection <0.5969.6> ([::1]:52879 -> [::1]:5672):
2021-09-28 12:04:24.867000+08:00 [error] <0.5969.6> {handshake_timeout,frame_header}
```



引起该问题的原因一般与<a href="./[网络] 主机域名解析和DNS.html" target="_blank">RabbitMQ的主机域名解析和DNS策略</a>有关，可以尝试下面的解决思路：

1. 确认RabbitMQ服务与应用服务之间的网络已经连通。

2. 确认网络已连通后，查看应用服务中的RabbitMQ服务的host配置中，是否使用了域名（localhost 也算在内）。如果使用了域名，一定要保证这些域名在服务器的hosts文件中已经配置好（localhost 也算在内）。

3. 如果第2步依然无法解决问题，那么修改配置文件，禁用RabbitMQ的DNS查找

   ```
   reverse_dns_lookups = false
   ```

   

