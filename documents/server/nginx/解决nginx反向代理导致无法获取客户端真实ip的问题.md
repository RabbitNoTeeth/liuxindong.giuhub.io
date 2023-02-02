在使用nginx反向代理时，会导致后端服务器无法获取到客户端正确的IP地址，要解决这个问题，可以在nginx反向代理配置中添加如下header。



```
location /api {
	# 配置反向代理
	proxy_pass http://127.0.0.1:8090;
	# 解决无法获取客户端真实IP的问题
	proxy_set_header            Host $host;  
	proxy_set_header            X-Real-Ip $remote_addr;  
	proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;
}
```



按照上述方法配置后，可以在后端服务器中通过 **X-Real-Ip** 或者 **X-Forwarded-For** 来获取客户端真实ip，那么这两者有何区别呢？

- X-Real-Ip

  通常，如果只存在一层代理，那么该请求头的值即为客户端真实ip。

- X-Forwarded-For

  如果存在多层代理，那么该请求头的值的格式为 “ip1,ip2,ip3...”，有几层代理，那么其值中就会有几个ip，其中第一个ip就是客户端的真实ip。