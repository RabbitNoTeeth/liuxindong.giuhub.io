[TOC]

简单编写一组Netty服务器+客户端应用，先来熟悉一下Netty的基础构件是怎样互相连接使用的，在后面的章节中将对每个构件进行具体讲解分析。



# 1 编写Echo服务器

所有的Netty服务器都需要以下两部分：

1. 至少一个ChannelHandler实现类，该组件实现了服务器对从客户端接收的数据的处理，即它的业务逻辑。
2. 引导，这是配置服务器的启动代码。



## 1.1 ChannelHandler

```
****** 代码清单2-1 EchoServerHandler ******

/**
 * 定义ChannelHandler实现类,进行业务逻辑处理
 */
@ChannelHandler.Sharable        //标识为可共享的
public class EchoServerHandler extends ChannelInboundHandlerAdapter {

    /**
     * 每个传入的消息都将调用该方法
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf in = (ByteBuf) msg;
        // 控制台打印消息
        System.out.println("服务器收到了来自客户端的消息: "+in.toString(CharsetUtil.UTF_8));
        // 定义返回给客户端的消息
        ByteBuf back = Unpooled.copiedBuffer("我是服务器,我收到了你的信息!",CharsetUtil.UTF_8);
        // 将消息写给发送者,而不冲刷出站消息,也就是暂时不会发送给客户端
        ctx.write(back);
    }

    /**
     * 通知ChannelInboundHandler最后一次对channelRead()的调用是当前批量读取中的最后一条消息
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        // 冲刷channelRead()中写入到发送者的消息,也就是将消息发送给客户端,发送完毕关闭该Channel
       ctx.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
    }

    /**
     * 抛出异常时会调用该方法
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // 打印异常堆栈
        cause.printStackTrace();
        // 关闭channel
        ctx.close();
    }
}
```

除了ChannelInboundHandlerAdapter之外，还有很多需要学习的ChannelHandler的子类型和实现类，我们将在后面的章节进行具体的讲述，目前，请记住以下关键点：

1. 针对不同类型的事件来调用ChannelHandler。
2. 应用程序通过实现或者扩展ChannelHandler来挂钩到事件的生命周期，并且提供自定义的应用程序逻辑。
3. 在架构上，ChannelHandler有助于保持业务逻辑与网络处理代码的分离。



## 1.2 引导

```
****** 程序清单2-2 EchoServer ******

/**
 * 引导服务器
 */
public class EchoServer {

    private final int port;

    public EchoServer(int port) {
        this.port = port;
    }

    public static void main(String[] args) throws Exception {

        new EchoServer(8989).start();

    }

    public void start() throws Exception{
        final EchoServerHandler serverHandler = new EchoServerHandler();
        // 创建NioEventLoopGroup实例来进行事件的处理
        EventLoopGroup group = new NioEventLoopGroup();
        try{
            // 创建ServerBootstrap实例来引导和绑定服务器
            ServerBootstrap b = new ServerBootstrap();
            // 绑定EventLoopGroup
            b.group(group)
                    // 指定所使用的Nio传输Channel
                    .channel(NioServerSocketChannel.class)
                    // 使用指定端口的套接字地址
                    .localAddress(new InetSocketAddress(port))
                    /** 使用EchoServerHandler的实例初始化每一个新的Channel
                     * 详解: 当一个新的连接建立时,一个新的子Channel将会被创建,而ChannelInitializer会
                     * 把一个你的EchoServerHandler实例添加到新Channel的ChannelPipeline中
                     */
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            socketChannel.pipeline().addLast(serverHandler);
                        }
                    });
            // 异步绑定服务器,调用sync()方法阻塞直到绑定完成
            ChannelFuture future = b.bind().sync();
            // 获取Channel的CloseFuture,并且阻塞当前线程直到它完成关闭操作
            future.channel().closeFuture().sync();
        } finally {
            // 关闭EventLoopGroup,释放资源
            group.shutdownGracefully().sync();
        }
    }
}
```

这个时候，服务器已经初步完成了，并且可以被使用了。



# 2 编写Echo客户端

Echo客户端将会：

1. 连接到服务器。
2. 发送一个或者多个消息。
3. 对于每个消息，等待并接收从服务器发回的消息。
4. 关闭连接。



编写客户端所涉及的主要代码部分也是业务逻辑和引导，与在服务器中一样。



## 2.1 ChannelHandler

```
****** 代码清单2-3 客户端的ChannelHandler ******

/**
 * 定义ChannelHandler实现类,处理业务逻辑
 */
@ChannelHandler.Sharable
public class EchoClientHandler extends SimpleChannelInboundHandler<ByteBuf>{

    /**
     * 客户端连接成功后,会调用该方法
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        ctx.writeAndFlush(Unpooled.copiedBuffer("我是客户端,我已经建立连接了!", CharsetUtil.UTF_8));
    }

    /**
     * 接收到服务端的消息时,触发该方法
     * @param channelHandlerContext
     * @param byteBuf
     * @throws Exception
     */
    @Override
    public void channelRead0(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf) throws Exception {
        // 打印服务器发回的消息
        System.out.println("客户端接收到服务器返回的消息: " + byteBuf.toString(CharsetUtil.UTF_8));
    }

    /**
     * 发生异常时,触发该方法
     * @param ctx
     * @param cause
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        System.out.println("我是处理器,捕获到了客户端的连接异常!");
        cause.printStackTrace();
        ctx.close();
    }
}
```



## 2.2 引导

```
****** 程序清单2-4 客户端的主类 ******

/**
 * 客户端
 */
public class EchoClient {

    private final String host;

    private final int port;

    public EchoClient(String host, int port) {
        this.host = host;
        this.port = port;
    }

    public static void main(String[] args) throws InterruptedException {

        new EchoClient("localhost",8989).start();

    }

    public void start() throws InterruptedException {
        // 创建EventLoopGroup处理事件
        EventLoopGroup group = new NioEventLoopGroup();
        try{
            // 创建Bootstrap
            Bootstrap b = new Bootstrap();
            // 绑定EventLoopGroup
            b.group(group)
                    // 指定Nio传输的Channel类型
                    .channel(NioSocketChannel.class)
                    // 设置服务器的地址
                    .remoteAddress(new InetSocketAddress(host,port))
                    // 添加事件处理类,即EchoClientHandler
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            socketChannel.pipeline().addLast(new EchoClientHandler());
                        }
                    });
            // 连接到服务器,阻塞等待直到连接完成
            ChannelFuture future = b.connect().sync();
            // 阻塞,直到Channel关闭
            future.channel().closeFuture().sync();
        } finally {
            // 释放资源
            group.shutdownGracefully().sync();
        }
    }
}
```

至此，简单的客户端也创建完成了。



分别run启动服务器和客户端的main方法，看看会发生什么。