[TOC]



# 1 自定义处理器

一般情况下，对于字符类数据传输，继承TextWebSocketHandler，重写感兴趣的方法即可

```
public class MsgWebSocketHandler extends TextWebSocketHandler {


    /**
     * 连接成功时候，会触发前端onopen方法
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    /**
     * 关闭连接时触发
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

    }

    /**
     * js调用websocket.send时候，会调用该方法
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

    }

    /**
     * ws连接异常时，会调用该方法
     */
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

}
```



# 2 自定义拦截器

继承HttpSessionHandshakeInterceptor，可通过重写连接创建前后的回调方法来进行业务处理（如权限校验等）。

```
public class MsgWebSocketHandlerInterceptor extends HttpSessionHandshakeInterceptor {

    /**
     * 在进行握手连接前执行
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        // do something
        return super.beforeHandshake(request, response, wsHandler, attributes);

    }

    /**
     * 在完成握手连接后执行
     */
    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                               Exception ex) {
        super.afterHandshake(request, response, wsHandler, ex);
    }
}
```



# 3 注册

```
@Configuration
@EnableWebSocket
public class MyWebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(new MsgWebSocketHandler(),"/msgWebSocket")
                .setAllowedOrigins("*")
                .addInterceptors(new MsgWebSocketHandlerInterceptor());

        registry.addHandler(new MsgWebSocketHandler(), "/sockjs/msgWebSocket")
                .setAllowedOrigins("*")
                .addInterceptors(new MsgWebSocketHandlerInterceptor()).withSockJS();

    }

}
```