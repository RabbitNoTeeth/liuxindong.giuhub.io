在java的集合体系中，Collection接口作为顶层接口，其继承了Iterable接口。本章节主要介绍下JDK8中为此接口新增的三个方法。

1. removeIf(Predicate<? super E> filter)

   参数为函数式接口，可以通过传入lambda来灵活的控制删除条件。

2. spliterator()

   返回一个可分割迭代器。

3. stream()

   返回集合的stream流。



**补充: 关于集合克隆**

有时，我们希望对集合进行克隆来获取一个包含相同元素的集合，那么为什么Collection接口没有实现Cloneable接口呢？

因为Collection作为所以集合类的顶层接口，不能来统一定义clone，对于各种不同的实现类，有时可能需要作为不可变集合，而不可变集合并不需要clone功能，因为其本身不可变。所以，由于各种集合的具体实现类的需要和用途不一样，对是否需要实现Cloneable的需求也不同，故而并没有在顶层接口定义clone，而是将是否需要实现clone功能完全交给子类自身。