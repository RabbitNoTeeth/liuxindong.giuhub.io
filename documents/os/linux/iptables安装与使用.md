[TOC]



# 1 安装

1. 安装 iptables

   ```
   yum  install iptables-services
   ```

2. 重启防火墙使配置文件生效

   ```
   systemctl restart iptables.service
   ```

3. 设置为开机启动

   ```
   systemctl  enable iptables.service
   ```

4. 查看激活状态

   ```
   systemctl status iptables.service
   ```

5. 查看本机 iptables 的设置情况

   ```
   iptables -nL
   ```

   

# 2 开放端口

1. 编辑配置文件

   ```
   vi /etc/sysconfig/iptables
   ```

2. 添加端口

   ```
   -A INPUT -p tcp -m state --state NEW -m tcp --dport 8080 -j ACCEPT
   ```

3. 重启服务

   ```
   service iptables restart
   ```