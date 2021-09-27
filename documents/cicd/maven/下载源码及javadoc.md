在用IDEA或者Eclipse等开发工具开发maven项目时，引入新的jar包依赖后，maven默认只下载其发行包，不会下载其源码和 javadoc，如果需要下载这二者，可以通过项目级设置或者maven全局配置来实现。



# 1 项目

在当前项目目录下执行命令：

```
mvn dependency:sources									// 下载源码
mvn dependency:resolve -Dclassifier=javadoc				// 下载javadoc
```



命令执行后，只对当前项目依赖生效，即只下载当前项目依赖的源码和javadoc（并不是所有的依赖都会有源码和javadoc）。



# 2 全局

打开maven配置文件 `setting.xml` 文件（`.../.m2/settings.xml`）增加如下配置：

```xml
<profiles>
    <profile>
        <id>downloadSources</id>
        <properties>
            <downloadSources>true</downloadSources>
            <downloadJavadocs>true</downloadJavadocs>           
        </properties>
    </profile>
</profiles>
 
<activeProfiles>
	<activeProfile>downloadSources</activeProfile>
</activeProfiles>
```



配置文件更新后，将对所有maven项目生效。