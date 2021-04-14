[TOC]



Spring Cache是作用在方法上的，其核心思想是：在调用一个缓存方法时会把该方法参数和返回结果作为一个键值对存放在缓存中，等到下次通过同样的参数来调用该方法时将不再执行该方法，而是直接从缓存中获取结果进行返回。所以在使用Spring Cache的时候我们要保证我们缓存的方法对于相同的方法参数要有相同的返回结果。



# 1 核心注解

@Cacheable和@CacheEvict。使用@Cacheable标记的方法在执行后Spring Cache将缓存其返回结果，而使用@CacheEvict标记的方法会在方法执行前或者执行后移除Spring Cache中的某些元素。



## 1.1 @Cacheable

方法注解、类注解。

当标记在一个方法上时表示该方法是支持缓存的，Spring会在其被调用后将其返回值缓存起来，以保证下次利用同样的参数来执行该方法时可以直接从缓存中获取结果，而不需要再次执行该方法。

当标记在一个类上时则表示该类所有的方法都是支持缓存的。

Spring在缓存方法的返回值时是以键值对进行缓存的，值就是方法的返回结果，至于键的话，Spring又支持两种策略，默认策略和自定义策略，这个稍后会进行说明。

需要注意的是当一个支持缓存的方法在对象内部被调用时是不会触发缓存功能的。

`@Cacheable`可以指定三个属性，value、key和condition。



### 1.1.1 value

value属性是必须指定的，其表示当前方法的返回值是会被缓存在哪个Cache上的，对应Cache的名称。其可以是一个Cache也可以是多个Cache，当需要指定多个Cache时其是一个数组。

```
@Cacheable("cache1")                             //Cache是发生在cache1上的
public User find(Integer id) {
	return null;
}

@Cacheable({"cache1", "cache2"})                //Cache是发生在cache1和cache2上的
public User find(Integer id) {
	return null;
}
```



### 1.1.2 key

key属性是用来指定Spring缓存方法的返回结果时对应的key的。该属性支持SpringEL表达式。当我们没有指定该属性时，Spring将使用默认策略生成key。我们这里先来看看自定义策略，至于默认策略会在后文单独介绍。

自定义策略是指我们可以通过Spring的EL表达式来指定我们的key。这里的EL表达式可以使用方法参数及它们对应的属性。使用方法参数时我们可以直接使用“#参数名”或者“#p参数index”。下面是几个使用参数作为key的示例。

```
@Cacheable(value="users", key="#id")            // 参数id作为key
public User find(Integer id) {
	return null;
}

@Cacheable(value="users", key="#p0")            // 第一个参数作为key
public User find(Integer id) {
	return null;
}

@Cacheable(value="users", key="#user.id")       // 参数user的id属性作为key
public User find(User user) {
	return null;
}

@Cacheable(value="users", key="#p0.id")         // 第一个参数的id属性作为key
public User find(User user) {
	return null;
}
```



除了上述使用方法参数作为key之外，Spring还为我们提供了一个root对象可以用来生成key。通过该root对象我们可以获取到以下信息。

```
属性名称                   描述                              示例
methodName                当前方法名                         #root.methodName
method                    当前方法                           #root.method.name
target                    当前被调用的对象                    #root.target
targetClass               当前被调用的对象的class             #root.targetClass
args                      当前方法参数组成的数组              #root.args[0]
caches                    当前被调用的方法使用的Cache         #root.caches[0].name
```



当我们要使用root对象的属性作为key时我们也可以将“#root”省略，因为Spring默认使用的就是root对象的属性。

```
@Cacheable(value={"users", "xxx"}, key="caches[1].name")
public User find(User user) {
	returnnull;
}
```



### 1.1.3 condition

有的时候我们可能并不希望缓存一个方法所有的返回结果，通过condition属性可以实现这一功能。

condition属性默认为空，表示将缓存所有的调用情形。其值是通过SpringEL表达式来指定的，当为true时表示进行缓存处理；当为false时表示不进行缓存处理，即每次调用该方法时该方法都会执行一次。如下示例表示只有当user的id为偶数时才会进行缓存。

```
@Cacheable(value={"users"}, key="#user.id", condition="#user.id%2==0")
public User find(User user) {
	System.out.println("find user by user " + user);
	return user;
}
```



## 1.2 @CachePut

与`@Cacheable`不同的是使用`@CachePut`标注的方法在执行前不会去检查缓存中是否存在之前执行过的结果，而是每次都会执行该方法，并将执行结果以键值对的形式存入指定的缓存中。

`@CachePut`也可以标注在类上和方法上。使用`@CachePut`时我们可以指定的属性跟`@Cacheable`是一样的。

```
@CachePut("users")//每次都会执行方法，并将结果存入指定的缓存中
public User find(Integer id) {
	return null;
}
```



## 1.3 @CacheEvict

`@CacheEvict`是用来标注在需要清除缓存元素的方法或类上的。当标记在一个类上时表示其中所有的方法的执行都会触发缓存的清除操作。

`@CacheEvict`可以指定的属性有value、key、condition、allEntries和beforeInvocation。



### 1.3.1 value、key、condition

不再赘述，与 1.1.1、1.1.2、1.1.3 相同。



### 1.3.2 allEntries

 allEntries是boolean类型，表示是否需要清除缓存中的所有元素，默认为false，表示不需要。

当指定了allEntries为true时，Spring Cache将忽略指定的key。有的时候我们需要Cache一下清除所有的元素，这比一个一个清除元素更有效率。

```
@CacheEvict(value="users", allEntries=true)
public void delete(Integer id) {
	System.out.println("delete user by id: " + id);
}
```



### 1.3.3 beforeInvocation

清除操作默认是在对应方法成功执行之后触发的，即方法如果因为抛出异常而未能成功返回时也不会触发清除操作。使用beforeInvocation可以改变触发清除操作的时间，当我们指定该属性值为true时，Spring会在调用该方法之前清除缓存中的指定元素。

```
@CacheEvict(value="users", beforeInvocation=true)
public void delete(Integer id) {
	System.out.println("delete user by id: " + id);
}
```



## 1.4 @Caching

`@Caching`注解可以让我们在一个方法或者类上同时指定多个Spring Cache相关的注解。其拥有三个属性：cacheable、put和evict，分别用于指定`@Cacheable`、`@CachePut`和`@CacheEvict`。

```
@Caching(cacheable = @Cacheable("users"), evict = { @CacheEvict("cache2"),
			@CacheEvict(value = "cache3", allEntries = true) })
public User find(Integer id) {
	return null;
}
```



# 2 自定义注解

Spring允许我们在配置可缓存的方法时使用自定义的注解，前提是自定义的注解上必须使用对应的注解进行标注。

如我们有如下这么一个使用`@Cacheable`进行标注的自定义注解。

```
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Cacheable(value="users")
public @interface MyCacheable {
 
}
```



那么在我们需要缓存的方法上使用`@MyCacheable`进行标注也可以达到同样的效果。

```
   @MyCacheable
   public User findById(Integer id) {
     System.out.println("find user by id: " + id);
     User user = new User();
     user.setId(id);
     user.setName("Name" + id);
      return user;
   }
```



# 3 配置spring对cache的支持

## 3.1 基于注解

```
<cache:annotation-driven/>
```

标签属性如下：

1. cache-manager

   指定当前所使用的CacheManager对应的bean的名称，默认是cacheManager，所以当我们的CacheManager的id为cacheManager时我们可以不指定该参数，否则就需要我们指定了。

2. mode

   可选值有proxy和aspectj，默认是使用proxy。当mode为proxy时，只有缓存方法在外部被调用的时候Spring Cache才会发生作用，这也就意味着如果一个缓存方法在其声明对象内部被调用时Spring Cache是不会发生作用的。而mode为aspectj时就不会有这种问题。另外使用proxy时，只有public方法上的@Cacheable等标注才会起作用，如果需要非public方法上的方法也可以使用Spring Cache时把mode设置为aspectj。

3. proxy-target-class

   表示是否要代理class，默认为false。我们前面提到的`@Cacheable`、`@CacheEvict`等也可以标注在接口上，这对于基于接口的代理来说是没有什么问题的，但是需要注意的是当我们设置proxy-target-class为true或者mode为aspectj时，是直接基于class进行操作的，定义在接口上的`@Cacheable`等Cache注解不会被识别到，那对应的Spring Cache也不会起作用了。

需要注意的是`<cache:annotation-driven/>`只会去寻找定义在同一个ApplicationContext下的`@Cacheable`等缓存注解。



## 3.2 基于XML

除了使用注解来声明对Cache的支持外，Spring还支持使用XML来声明对Cache的支持。

下面来看一个示例：

```
   <cache:advice id="cacheAdvice" cache-manager="cacheManager">
      <cache:caching cache="users">
         <cache:cacheable method="findById" key="#p0"/>
         <cache:cacheable method="find" key="#user.id"/>
         <cache:cache-evict method="deleteAll" all-entries="true"/>
      </cache:caching>
   </cache:advice>
```



# 4 配置CacheManager

CacheManager是Spring定义的一个用来管理Cache的接口。

Spring自身已经为我们提供了两种CacheManager的实现，一种是基于Java API的ConcurrentMap，另一种是基于第三方Cache实现——Ehcache。如果我们需要使用其它类型的缓存时，我们可以自己来实现Spring的CacheManager接口或AbstractCacheManager抽象类。下面分别来看看Spring已经为我们实现好了的两种CacheManager的配置示例



## 4.1 基于ConcurrentMap的配置

```
   <bean id="cacheManager">
      <property name="caches">
         <set>
            <bean p:name="xxx"/>
         </set>
      </property>
   </bean>
```

上面的配置使用的是一个SimpleCacheManager，其中包含一个名为“xxx”的ConcurrentMapCache。



## 4.2 基于Ehcache的配置

```
<!-- Ehcache实现 -->
   <bean id="cacheManager"p:cache-manager-ref="ehcacheManager"/>
   <bean id="ehcacheManager" p:config-location="ehcache-spring.xml"/>
```

上面的配置使用了一个Spring提供的EhCacheCacheManager来生成一个Spring的CacheManager，其接收一个Ehcache的CacheManager，因为真正用来存入缓存数据的还是Ehcache。

Ehcache的CacheManager是通过Spring提供的EhCacheManagerFactoryBean来生成的，其可以通过指定ehcache的配置文件位置来生成一个Ehcache的CacheManager。若未指定则将按照Ehcache的默认规则取classpath根路径下的ehcache.xml文件，若该文件也不存在，则获取Ehcache对应jar包中的ehcache-failsafe.xml文件作为配置文件。



# 5 键的生成策略

## 5.1 默认策略

默认的key生成策略是通过KeyGenerator生成的，其默认策略如下：

```
如果方法没有参数，则使用0作为key。
如果只有一个参数的话则使用该参数作为key。
如果参数多于一个的话则使用所有参数的hashCode作为key。
```



## 5.2 自定义策略

如果我们需要指定自己的默认策略的话，那么我们可以实现自己的KeyGenerator，然后指定我们的Spring Cache使用的KeyGenerator为我们自己定义的KeyGenerator。

使用基于注解的配置时是通过cache:annotation-driven指定的。

```
   <cache:annotation-driven key-generator="userKeyGenerator"/>
   <bean id="userKeyGenerator"/>
```



而使用基于XML配置时是通过`cache:advice`来指定的。

```
   <cache:advice id="cacheAdvice" cache-manager="cacheManager" key-generator="userKeyGenerator">
   </cache:advice>
```



需要注意的是此时我们所有的Cache使用的Key的默认生成策略都是同一个KeyGenerator。