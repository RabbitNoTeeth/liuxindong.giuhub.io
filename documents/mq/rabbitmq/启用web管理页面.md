RabbitMQ自带web管理页面，但是在安装后是默认不启用的，需要手动执行以下命令才可以启动：

1. 进入目录 `RabbitMQ安装目录/sbin`

2. 打开命令行，执行

   ```
   rabbitmq-plugins enable rabbitmq_management
   ```




命令执行完成后，浏览器访问 http://localhost:15672 即可，默认用户名密码 guest。



:smiley:ps：可通过 `rabbitmq-plugins list` 命令查看RabbitMQ的插件启用状态。

