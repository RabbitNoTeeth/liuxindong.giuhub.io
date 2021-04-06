[TOC]

CentOS7开始系统默认安装firewalld防火墙。



# 1 启动与停止

1. 启动

   ```
   systemctl start firewalld
   ```

2. 关闭

   ```
   systemctl stop firewalld
   ```

3. 查看状态

   ```
   systemctl status firewalld 
   ```

4. 开机禁用

   ```
   systemctl disable firewalld
   ```

5. 开机启用

   ```
   systemctl enable firewalld
   ```

   

# 2 开放端口

1. 添加（--permanent永久生效，没有此参数重启后失效）

   ```
   firewall-cmd --zone=public --add-port=80/tcp --permanent   
   ```

2. 重新载入

   ```
   firewall-cmd --reload
   ```

3. 查看

   ```
   firewall-cmd --zone= public --query-port=80/tcp
   ```

   

# 3 关闭端口

1. 删除（--permanent永久生效，没有此参数重启后失效）

   ```
   firewall-cmd --zone=public --remove-port=80/tcp --permanent   
   ```

2. 重新载入

   ```
   firewall-cmd --reload
   ```

3. 查看

   ```
   firewall-cmd --zone= public --query-port=80/tcp
   ```

   

# 4 其他命令

1. 查看版本

   ```
   firewall-cmd --version
   ```

2. 查看帮助

   ```
   firewall-cmd --help
   ```

3. 显示状态

   ```
   firewall-cmd --state
   ```

4. 查看所有打开的端口

   ```
   firewall-cmd --zone=public --list-ports
   ```

5. 更新防火墙规则

   ```
   firewall-cmd --reload
   ```

6. 查看区域信息

   ```
   firewall-cmd --get-active-zones
   ```

7. 查看指定接口所属区域

   ```
   firewall-cmd --get-zone-of-interface=eth0
   ```

8. 拒绝所有包

   ```
   firewall-cmd --panic-on
   ```

9. 取消拒绝状态

   ```
   firewall-cmd --panic-off
   ```

10. 查看是否拒绝

    ```
    firewall-cmd --query-panic
    ```

    