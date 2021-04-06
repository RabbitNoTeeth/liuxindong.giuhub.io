[TOC]

编码器操作出站数据，解码器处理入站数据。

对于编码器和解码器来说，一旦消息被编码或者解码，它就会被`ReferenceCountUtil.release(message)`调用自动释放。可以通过调用`ReferenceCountUtil.retain(message)`来增加引用计数，防止消息被释放。





# 1 解码器

## 1.1 ByteToMessgeDecoder

抽象类。

|                             方法                             |                             描述                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| decode(ChannelHandlerContext ctx,ByteBuf buf,List\<Object> out) | 必须实现的方法。将ByteBuf中的数据放入List中，如果List不为空，将被传递给下一个ChannelInboundHandler |
| decodeLast(ChannelHandlerContext ctx,ByteBuf buf,List\<Object> out) | 该方法的默认实现只是简单调用decode()方法，当Channel的状态变为非活动时，这个方法将会被调用一次。可以重写该方法以提供特殊的处理。 |



## 1.2 ReplayingDecoder

抽象类。

ReplayingDecoder拓展了ByteToMessgeDecoder，使得在decode()方法中读取ByteBuf中的数据时不需要再调用`readableBytes()`方法，而可以直接读取所有可读的数据。

但是ReplayingDecoder并不适用于所有的ByteBuf操作，而且速度也比ByteToMessgeDecoder慢。

一个简单的准则：如果使用ByteToMessgeDecoder不会引入太多的复杂性，那么请使用ByteToMessgeDecoder。否则才使用ReplayingDecoder。



## 1.3 MessageToMessageDecoder

抽象类。

在两个消息格式之间进行转换（如从一种POJO类型转换为另一种）。



## 1.4 TooLongFrameException

由于Netty是一个异步框架，所以需要在字节可以解码之前在内存中缓冲，为了避免解码器缓冲大量的数据导致内存耗尽问题，Netty提供了TooLongFrameException异常类，由解码器在帧超出制定大小限制的时候抛出。

我们可以自定义帧的阀值，超出这个值，抛出TooLongFrameException异常，异常会被`exceptionCaught()`方法捕获。



```
****** 代码清单10-4 TooLongFrameException使用示例 ******

public class SafeByteToMessageDecoder extends ByteToMessageDecoder {
    private static final int MAX_FRAME_SIZE = 1024;
    protected void decode(ChannelHandlerContext channelHandlerContext, ByteBuf byteBuf, List<Object> list) throws Exception {
        int readable = byteBuf.readableBytes();
        if(readable > MAX_FRAME_SIZE){
            byteBuf.skipBytes(readable);
            throw new TooLongFrameException("Frame too big!");
        }
    }
}
```



# 2 编码器

### 2.1 MessageToByteEncoder 

抽象类。



## 2.2 MessageToMessageEncoder

抽象类。



# 3 抽象的编解码器类

Netty的抽象编解码器类中同时管理了入站数据和出站数据和消息的转换工作，这些类同时实现了ChannelInboundHandler和ChannelOutboundHandler。



### 3.1 ByteToMessageCodec 

抽象类。



### 3.2 MessageToMessageCodec

抽象类。



### 3.3 CombinedChannelDuplexHandler

可以通过继承CombinedChannelDuplexHandler来定义一个编解码器。

```
******代码清单10-10 通过独立的编码器和解码器,创建一个编解码器 ******

public class CombinedByteCharCodec extends CombinedChannelDuplexHandler<ByteToCharDecoder,CharToByteEncoder> {
    
    public CombinedByteCharCodec(){
        super(new ByteToCharDecoder(),new CharToByteEncoder());
    }
    
}
```