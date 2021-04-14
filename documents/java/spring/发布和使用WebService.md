[TOC]



# 1 发布服务

1.1 创建接口

```
@WebService(targetNamespace = "http://tdms.tangche.com/webservice/ESBMaterialConsumeService")
public interface ESBMaterialConsumeService {

    @WebMethod
    String material(@WebParam(name = "MARAS") MARAS maras);

}
```



1.2 创建接口实现

```
@Component
@WebService(name = "ESBMaterialConsumeService",
        targetNamespace = "http://tdms.tangche.com/webservice/ESBMaterialConsumeService",
        endpointInterface = "com.sunvua.interface_.esbmaterial.webservice.service.ESBMaterialConsumeService",
        portName = "ESBMaterialConsumePort")
public class ESBMaterialConsumeServiceImpl implements ESBMaterialConsumeService {

    @Override
    public String material(MARAS maras) {
        // 业务处理
        return "success";
    }

}
```



1.3 注册服务

```
@Configuration
public class WebserviceConfiguration {

    @Bean
    public ServletRegistrationBean<CXFServlet> wsServlet(){
        return new ServletRegistrationBean<>(new CXFServlet(), "/webservice/*");
    }

    @Autowired
    private ESBMaterialConsumeService esbMaterialConsumeService;

    @Autowired
    @Qualifier(Bus.DEFAULT_BUS_ID)
    private SpringBus bus;

    @Bean
    public Endpoint endpoint(){
        EndpointImpl endpoint = new EndpointImpl(bus, esbMaterialConsumeService);
        endpoint.publish("/ESBConsume/material");
        return endpoint;
    }

}
```

发布成功后，服务定义描述地址为 http://ip:port/webservice/ESBConsume/material?wsdl



# 2 使用服务

建议通过axis框架生成客户端代码。