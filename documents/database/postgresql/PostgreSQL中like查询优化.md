PostgreSQL提供**pg_trgm**扩展，它实现了“trigrams”，能够更好帮助模糊搜索。



pg_trgm 位于 PostgreSQL contrib 包中，一般情况下都会跟随 PostgreSQL 一起安装，如果没有，请到官网查看安装方式，此处不赘叙。

启用 pg_trgm 扩展非常简单，只需切换到目标数据库，然后执行：

```
CREATE EXTENSION pg_trgm;
```



为了支持like使用索引，pg_trgm 支持两种PostgreSQL索引类型：**gist** 和 **gin**。



# gin

创建gin索引：

```
CREATE INDEX idx_name ON yourtable USING gin (md5 gin_trgm_ops);
```



:collision: ​gin索引对于模糊搜索的提升相当直观，也就是like语句中包含‘%’的情况。但是，当like语句中不包含‘%’时，postgresql会使用‘=’进行精确查找，而gin是不会加速‘=’操作符的，所以建议在为某个字段添加gin索引的情况下，也加一个btree索引，这样便可以同时处理精确搜索和模糊搜索了。



# gist

gist索引对于空间数据的支持非常好，但是对于普通文本的模糊搜素，提升并不明显，并且索引体积很大，不推荐使用。
