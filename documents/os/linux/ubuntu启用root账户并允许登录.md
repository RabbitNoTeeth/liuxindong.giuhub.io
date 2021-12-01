ubuntu系统默认不启用root账户，需要自己手动启用及设置允许登录。



1. 修改root账户密码

   ```
   sudo passwd root
   ```

   

2. 设置允许root登录

   修改 `/etc/ssh/sshd_config` 文件

   ```
   # PermitRootLogin without-password # 修改此处
   PermitRootLogin yes
   ```

   