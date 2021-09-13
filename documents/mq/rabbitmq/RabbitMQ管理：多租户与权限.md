[TOC]



# 1 多租户

每一个RabbitMQ服务器都能够创建虚拟的消息服务器，我们称之为虚拟主机（virtual host），简称为 vhost。

每一个 vhost 本质上是一个独立的小型RabbitMQ服务器，拥有自己独立的队列、交换器和绑定关系等，并且它拥有自己独立的权限。

vhost 就像是虚拟机与物理服务器一样，它们在各个实例间提供逻辑上的分离，为不同程序安全保密地运行数据，它既能将同一个RabbitMQ中的众多客户去分开，又可以避免队列和交换器等命名冲突。

vhost 之间是绝对隔离的，无法将 vhost1 中的交换器与 vhost2 中的队列进行绑定。

当RabbitMQ的使用达到一定的规模后，建议用户对业务功能、场景进行归类区分，并为之分配独立的 vhost。



## 创建 vhost

```
rabbitmqctl add_vhost {vhost}
```

参数说明：

- vhost：要创建的 vhost 的名称。



## 删除 vhost

```
rabbitmqctl delete_vhost {vhost}
```

参数说明：

- vhost：要删除的 vhost 的名称。



## 查看 vhost

```
rabbitmqctl list_vhosts {vhost}
```

参数说明：

- vhost：要查看的 vhost 的名称。



# 2 权限

在RabbitMQ中，权限控制是以 vhost 为单位的。当创建一个用户时，用户通常会被指派给至少一个 vhost，并且只能访问被指派的 vhost 内的队列、交换器和绑定关系等。因此，RabbitMQ中的授予权限是指在 vhost 级别对用户而言的权限授予。



## 授予权限

```
rabbitmqctl set_permissions -p {vhost} {user} {conf} {write} {read}
```

参数说明：

- vhost：要授予用户访问权限的 vhost 的名称。
- user：被授予权限的用户名。
- conf：用于匹配用户在哪些资源上拥有可配置权限（指的是队列和交换器的创建及删除之类的操作）的正则表达式。
- write：用于匹配用户在哪些资源上拥有可写权限（指的是发布消息）的正则表达式。
- read：用于匹配用户在哪些资源上拥有可读权限（指的是与消息有关的操作，如读取消息、清空队列等）的正则表达式。



示例：

1. 授予root用户可访问虚拟主机 vhost1，并在所有资源上都具备可配置、可写和可读的权限。

   ```
   rabbitmqctl set_permissions -p vhost1 root ".*" ".*" ".*"
   ```

2. 授予root用户可访问虚拟主机 vhost2，在以“queue”开头的资源上具备可配置权限，并在所有资源上拥有可写和可读的权限。

   ```
   rabbitmqctl set_permissions -p vhost2 root "^queue.*" ".*" ".*"
   ```

   

## 清除权限

```
rabbitmqctl clear_permissions -p {vhost} {user}
```

参数说明：

- vhost：要清除用户访问权限的 vhost 的名称。
- user：被清除权限的用户名。



## 查看权限

**查看指定 vhost 的权限**

```
rabbitmqctl list_permissions -p {vhost}
```

参数说明：

- vhost：要查看权限的 vhost 的名称。



**查看指定用户的权限**

```
rabbitmqctl list_user_permissions {user}
```

参数说明：

- user：要查看权限的用户名。

