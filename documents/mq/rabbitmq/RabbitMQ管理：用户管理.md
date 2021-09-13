[TOC]

# 1 用户

在RabbitMQ中，用户是访问控制的基本单元，且单个用户可以跨越多个 vhost 进行授权。针对一至多个 vhost，用户可以被赋予不同级别的访问权限，并使用标准的用户名和密码来认证用户。



## **创建用户**

```
rabbitmqctl add_user {user} {password}
```

参数说明：

- user：新创建用户的用户名。
- password：新创建用户的密码。



## **删除用户**

```
rabbitmqctl delete_user {user}
```

参数说明：

- user：被删除用户的用户名。



## **修改密码**

```
rabbitmqctl change_password {user} {newpassword}
```

参数说明：

- user：要修改用户的用户名。
- newpassword：用户新密码。



# 2 角色

RabbitMQ中具有角色的概念，不同角色对应不用的RabbitMQ管理权限，RabbitMQ中定义了以下5种角色：

1. **none**

   无任何权限。新建用户的角色默认为none。

2. **management**

   可以访问Web管理页面。

3. **policymaker**

   包含management的所有权限，并且可以管理策略（Policy）和参数（Parameter）。

4. **monitoring**

   包含management的所有权限，并且可以看到所有连接、信道以及节点相关的信息。

5. **administrator**

   包含policymaker和monitoring的所有权限，并且可以管理用户、虚拟主机、权限等，代表了最高的权限。



## 设置用户角色

```
rabbitmqctl set_user_tags {user} {tag}
```

参数说明：

- user：用户名。
- tag：角色名称。



# 示例

```
rabbitmqctl add_user root 123							# 创建用户root，密码为123456
rabbitmqctl set_user_tags root administrator			# 设置用户root的角色为administrator
rabbitmqctl  set_permissions -p /  root '.*' '.*' '.*'	# 设置用户root具有vhost “/” 下的所有权限
```

