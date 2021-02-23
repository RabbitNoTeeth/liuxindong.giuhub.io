[TOC]



# 1 覆盖equals方法时的通用约定

1. 自反性
   对于任何非null的引用值x，x.equals(x)必须返回true。

2. 对称性
   对于任何非null的引用值x和y，在满足x.equals(y) = true的同时，必须满足y.equals(x) = true。

3. 传递性
   对于任何非null的引用值x和y 和z，如果满足x.equals(y) = true，y.equals(z) = true，那么必须满足x.equals(z) = true。

4. 一致性
   对于任何非null的引用值x和y，只要equals的比较操作在对象中所用到的信息没有被修改，多次调用x.equals(y)的结果必须一致，或者都为true，或者都为false。

5. 对于任何非null的引用值x，x.equals(null)必须返回false。



# 2 覆盖equals时的补充注意点

1. 覆盖equals时总要覆盖hashCode。

2. 无论类是否是不可变的，都不要使equals方法依赖于不可靠的资源。

3. 使用 instanceof 检查参数类型，instanceof 能同时检测非null，当参数为null时，其返回false。

4. 使用 instanceof 检查后，在比较前进行类型转换。

5. 对于float和double域，使用Float.compare和Double.compare进行比较，其他情况下使用 == 操作符进行比较。

6. 域的比较顺序可能影响equals方法的性能，优先比较最可能不一致的域，或者开销最低的域。

7. 不要企图让equals方法过于智能。

8. 不要将equals声明中的Object对象转换成其他类型。

9. 在设计子父类之间的equals比较时，优先考虑复合而不是继承。