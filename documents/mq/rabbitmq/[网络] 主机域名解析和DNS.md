一般情况下，RabbitMQ依靠erlang运行时来进行网络节点间的通讯（包括`rabbitmqctl`、`rabbitmq-plugins`等工具），客户端在连接RabbitMQ节点时也会执行主机域名解析。



**客户端执行的主机域名解析**

如果客户端在连接RabbitMQ节点时使用了域名，那么就会依靠DNS和本地hosts文件进行域名解析，这个解析过程会耗费一定的时间，如果使用了本地的域名，经过DNS后，可能会耗费很长的时间，可能会导致连接失败（handshake_timeout异常就可能与此有关）。



**反向DNS查找**

如果 `reverse_dns_lookups` 设置为 `true`，RabbitMQ将对客户端IP地址执行反向DNS查找，并在连接信息中列出主机名。

如果没有优化配置节点的主机名解析，反向DNS查找可能会花费很长时间。 这可能会增加接受客户端连接时的延迟。  

可以通过修改配置文件来启用或者禁用反向DNS查找：

- 启用

  ```
  reverse_dns_lookups = true
  ```

- 禁用

  ```
  reverse_dns_lookups = false
  ```



**验证主机域名解析**

RabbitMQ在3.8.6版本后新增了2个命令来帮助验证主机域名解析是否正常：

- `rabbitmq-diagnostics resolve_hostname`

  示例：

  ```
  # 在节点 rabbit@node1.cluster.local.svc 上将域名 node2.cluster.local.svc 解析成ipv6地址 
  rabbitmq-diagnostics resolve_hostname node2.cluster.local.svc --address-family IPv6 -n rabbit@node1.cluster.local.svc
  
  # 在本地节点上将域名 node2.local.local.svc 解析成ipv4地址 
  rabbitmq-diagnostics resolve_hostname node2.cluster.local.svc --address-family IPv4 --offline
  ```

  

- `rabbitmq-diagnostics resolver_info`

  示例：

  ```bash
  rabbitmq-diagnostics resolver_info
  ```

  命令执行后，将返回相关的解析设置信息，如下：

  ```
  Runtime Hostname Resolver (inetrc) Settings
  
  Lookup order: native
  Hosts file: /etc/hosts
  Resolver conf file: /etc/resolv.conf
  Cache size:
  
  inetrc File Host Entries
  
  (none)
  ```

  

