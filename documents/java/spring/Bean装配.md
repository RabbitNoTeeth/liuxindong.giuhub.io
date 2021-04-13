[TOC]

# 1 基础装配

## 1.1 装配方式

Spring提供了两种装配方式：

1. 基于XML的显示配置（XML config）
2. 基于Java的显示配置（Java config）



由于SpringBoot的普及以及网上丰富的资料，此处不讲解xml配置方式，只介绍java配置方式。



## 1.2 Java config

### 1.2.1 注册容器组件bean

#### 1.2.1.1 @Component

类注解，声明该类为spring容器组件bean，由容器进行生命周期管理（创建、销毁等）。

```
@Component
public class DataSourceConfig {
    public void test(){
        ...
    }
}
```



#### 1.2.1.2 @Configuration、@Bean

**@Configuration**：类注解，声明该类是一个配置类（配置类包含在Spring应用上下文如何创建bean的细节）。

**@bean**：方法注解，声明方法返回值为spring容器组件bean（默认bean的id为方法名，可以通过 name 属性自定义id）。

```
@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        return dataSource;
    }

}
```



### 1.2.2 引用容器组件bean

#### 1.2.2.1 @AutoWired

1. 可以使用在字段或者方法上。
2. spring自定义的注解，默认按类型装配；如果使用了 name 属性，那么按照名称进行装配。（当同一接口类型存在不同实现的bean时，需要处理歧义性问题，在下面的高级装配中会讲解）。
3. 默认情况下，要求依赖对象必须存在，否则提示异常（如果需要允许依赖不存在，可设置 required 属性为 false ）。



#### 1.2.2.2 @Resource

1. 可以使用在字段或者方法上。
2. J2EE规范注解，默认按名称装配，如果找不到，再通过类型进行装配；如果使用了 name 属性，那么只会按照名称进行装配。
3. 要求依赖对象必须存在。



# 2 高级装配

## 2.1 环境与profile

在实际项目中，我们会有不同的环境配置（如开发环境、测试环境、生产环境等），不同环境下，容器bean可能有差异，我们需要能够通过环境的切换，自动切换容器bean的注入，这便涉及到 profile 的使用。



### 2.1.1 Java config

**@Profile**：类注解、方法注解，可与 @Configuration 或者 @Bean 搭配使用。

下面两组示例都表示在 dev 环境下进行组件注册（没有配置@Profile的组件，始终会注册到容器中）。

```
@Configuration
@Profile("dev")
public class DataSourceConfig {

    @Bean
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        return dataSource;
    }

}
```



```
@Configuration
public class DataSourceConfig {

    @Bean
    @Profile("dev")
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        return dataSource;
    }

}
```



### 2.1.2 XML config

profile 属性。

```
<beans profile="dev">
    <bean>...
</beans>
```



## 2.2 解决自动装配的歧义性

假如存在接口 FruitDao，其有三个不同的实现（AppleImpl、BananaImpl、CherryImpl）都注册到容器中，在通过接口类型与@AutoWired配合使用时，就存在歧义性问题，容器无法判断应该注入哪一个实现bean。



**FruitDao**

```
public interface FruitDao {
	...
}
```



**AppleImpl、BananaImpl、CherryImpl**

```
public class AppleImpl implements FruitDao {
	...
}

public class BananaImpl implements FruitDao {
	...
}

public class CherryImpl implements FruitDao {
	...
}

@Configuration
public class Conf implements FruitDao {
	@Bean
    public AppleImpl appleImpl(){
        return new AppleImpl();
    }
    
    @Bean
    public BananaImpl bananaImpl(){
        return new BananaImpl();
    }
    
    @Bean
    public CherryImpl cherryImpl(){
        return new CherryImpl();
    }
}
```



**容器无法判断客户端需要哪一个bean**

```
@Component
public class Client {
	@AutoWired
	private FruitDao fruitDao;
}
```



### 2.2.1 @Primary

类注解、方法注解，可搭配 @Component 或 @Bean 注解使用，表示当存在歧义时，默认使用该bean。



**修改上述示例中bean的声明**

```
@Configuration
public class Conf implements FruitDao {
	@Bean
	@Primary	// 表示默认使用该bean
    public AppleImpl appleImpl(){
        return new AppleImpl();
    }
    
    @Bean
    public BananaImpl bananaImpl(){
        return new BananaImpl();
    }
    
    @Bean
    public CherryImpl cherryImpl(){
        return new CherryImpl();
    }
}
```



**那么在不修改客户端的情况下，客户端将自动注入 AppleImpl 实现**

```
@Component
public class Client {
	@AutoWired
	private FruitDao fruitDao;
}
```



但是@primary只能解决默认注入的问题，在将AppleImpl设置成默认的前提下，如果客户端想要使用 CherryImpl，是实现不了的，这时就要通过 @Qualifier 来实现。



### 2.2.2 @Qualifier

类注解、方法注解，可搭配 @Component 或 @Bean 注解使用，表示当前bean的限定符。



为了解决@Primary无法解决的问题，可做如下修改：

**修改bean的声明**

```
@Configuration
public class Conf implements FruitDao {
	@Bean
	@Primary	// 表示默认使用该bean
    public AppleImpl appleImpl(){
        return new AppleImpl();
    }
    
    @Bean
    @Qualifier("banana")
    public BananaImpl bananaImpl(){
        return new BananaImpl();
    }
    
    @Bean
    @Qualifier("cherry")
    public CherryImpl cherryImpl(){
        return new CherryImpl();
    }
}
```



**修改客户端**

```
@Component
public class Client {
	@AutoWired
	@Qualifier("cherry")
	private FruitDao fruitDao;
}
```



这样，便实现了指定 CherryImpl 的注入。



## 2.3 作用域

spring定义了4中bean的作用域：

1. singleton

   单例，在整个应用中，只创建一个bean的实例。

2. prototype

   原型，每次注入或者通过spring应用上下文获取时，都会创建一个新的bean实例。

3. session

   会话，在web应用中，为每个会话创建一个bean实例。

4. request

   请求，在web应用中，为每个请求创建一个bean实例。



### 2.3.1 Java config

**@Scope**：类注解、方法注解，通过四个可选值来声明bean的作用域。

```
@Configuration
@Scope("session") // 可以使用在类上
public class DataSourceConfig {

    @Bean
    //@Scope("session") 也可以使用在方法上
    public DataSource dataSource(){
        DruidDataSource dataSource = new DruidDataSource();
        return dataSource;
    }

}
```



### 2.3.2 XML config

session 属性，通过四个可选值来声明bean的作用域。

```
<bean id="..." scope="session" />
```



## 2.4 配置文件值注入

2.4.1 默认配置文件

在SpringBoot项目中，系统启动时将默认加载 application.yml 或者 application.properties 文件（如果指定了环境，也会读取对应环境的配置文件，但终究是要自动读取对应的配置文件的），此时我们可能想在组件注册时，从配置文件中获取相应的数据作为组件的字段值，这时便有以下两种情况。



### 2.4.1 @ConfigurationProperties

类注解，表示读取配置文件中指定属性的下一级属性的值，作为组件中相同名称字段的值。



**组件**

```
@Component
@ConfigurationProperties(prefix = "user")
public class A {
	private String name;
	private Integer age;
}
```



**配置文件**

以yml格式为例

```
user:
  name: liuxindong
  age: 28
```



组件 A 注入到容器后，name字段值为“liuxindong”，age字段值为“28”。



### 2.4.2 @Value

字段注解，直接读取配置文件中指定属性的值，作为组件中当前字段的值。同时，支持默认值设置，即如果在配置文件中未找到指定属性，那么使用默认值。

**组件**

```
@Component
public class A {
	@Value("${user.name}")
	private String name;
	@Value("${user.age}")
	private Integer age;
	@Value("${user.gender:man}") // 当配置文件中不存在‘user.gender’属性时，默认设置字段值为‘man’
	private String gender;
}
```



**配置文件**

以yml格式为例

```
user:
  name: liuxindong
  age: 28
```



组件 A 注入到容器后，name字段值为“liuxindong”，age字段值为“28”，gender字段值为“man”。



2.4.2 指定配置文件

当要读取的文件不在程序启动默认加载的配置文件中，并且文件格式为properties时，需要 @PropertySource 与 @Value 配合使用。



**组件**

```
@Component
@PropertySource("classpath:aaa.properties")
public class A {
	@Value("${user.name}")
	private String name;
	@Value("${user.age}")
	private Integer age;
	@Value("${user.gender:man}") // 当配置文件中不存在‘user.gender’属性时，默认设置字段值为‘man’
	private String gender;
}
```



**配置文件**

```
user.name=liuxindong
user.age=28
```



## 2.5 条件化注入

bean的创建是在满足指定的条件后，才会被创建。

spring4后提供了各种条件话注入的注解，如 @ConditionOnBean、@ConditionalOnClass、@ConditionalOnMissingBean 等，具体不一一讲解，可以查看 `org.springframework.boot.autoconfigure.condition` 包下相关的注解源码中的说明，通俗易懂。



## 2.6 SpEL表达式

Spring3引入了SpEL表达式，借助SpEL，可以实现超乎想像的装配效果。



### 2.6.1 基础语法

```
#{ }
```



### 2.6.2 表示字面量

```
#{ 3.1415 }    浮点数
#{ 9.87E4 }    科学计数
#{ 'hello' }    字符串
#{ true }        boolean类型
```



### 2.6.3 引用bean、属性、方法

```
#{beanId}            引用bean
#{beanId.field1}      引用属性(字段)
#{beanId.method()}      引用方法
#{beanId.getName()?.toUpperCase()}   ?为安全符,当 getName() 返回值为null时不再向下执行,直接返回null,避免空指针异常
```



### 2.6.4 运算符

```
算术运算     +  -  *  /  ^  %
比较运算     <  >  ==  <=  >=
逻辑运算     and  or  not  |
条件运算     ?:
正则表达式   matches
```



### 2.6.5 计算集合

```
#{list[2]}                                        获取集合角标2位置的元素
#{jukebox.songs.?[article == 'Aerosmith']}        获取jukebox中article属性为Aerosmith的所有歌曲
#{jukebox.songs.^[article == 'Aerosmith']}        获取jukebox中article属性为Aerosmith的第一首歌曲
#{jukebox.songs.$[article == 'Aerosmith']}        获取jukebox中article属性为的Aerosmit的最后一首歌曲
#{jukebox.songs.![title]}                         将jukebox中所有歌曲的title属性映射到一个新的String类型的集合中
```



这里简单介绍的SpEL表达只是皮毛，在后面定义安全规则时我们可以更加深一层的接触SpEL。