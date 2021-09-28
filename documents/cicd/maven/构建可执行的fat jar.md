[TOC]



# 什么是fat jar？ 

maven默认打出来的jar包是只包含应用源代码，但是不包含应用的依赖的，这是如果要执行这个jar，需要在其外部放好相关的依赖才可以。而fat jar，顾名思义，很胖的jar，就是将应用的所有依赖和源码一起打包成一个jar，这样的好处就是不需要在外部单独维护应用的依赖了。



# 如何构建fat jar？

可以通过maven插件实现fat jar的构建，一般有以下几种插件可用。



## maven-shade-plugin 

该插件可以构建可执行的fat jar，但是无法将本地依赖文件打入fat jar中。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>xxx(your project groupId)</groupId>
  <artifactId>xxx(your project artifactId)</artifactId>
  <version>xxx(your project version)</version>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>

    <maven-compiler-plugin.version>3.8.1</maven-compiler-plugin.version>
    <maven-shade-plugin.version>3.2.4</maven-shade-plugin.version>
    <maven-surefire-plugin.version>2.22.2</maven-surefire-plugin.version>
    <exec-maven-plugin.version>3.0.0</exec-maven-plugin.version>

    <main.class>xxx(the main class of your project)</main.class>
  </properties>

  <dependencies>
  	<dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-lang3</artifactId>
        <version>3.12.0</version>
    </dependency>
    ...
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>${maven-compiler-plugin.version}</version>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>${maven-shade-plugin.version}</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>shade</goal>
            </goals>
            <configuration>
              <transformers>
                <transformer
                  implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                  <manifestEntries>
                    <Main-Class>${main.class}</Main-Class>
                  </manifestEntries>
                </transformer>
              </transformers>
            </configuration>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>${maven-surefire-plugin.version}</version>
      </plugin>
    </plugins>
  </build>


</project>
```



## onejar-maven-plugin

该插件不仅可以构建可执行的fat jar，还能将本地依赖文件打入fat jar中。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>TestB</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>

        <main.class>com.example.AppBootstrap</main.class>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>3.12.0</version>
        </dependency>
        <dependency>
            <groupId>jna</groupId>
            <artifactId>jna</artifactId>
            <version>5.9.0</version>
            <scope>system</scope>
            <systemPath>${project.basedir}/lib/jna-5.9.0.jar</systemPath>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.2.0</version>
                <configuration>
                    <archive>
                        <manifest>
                            <mainClass>${main.class}</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
            <plugin>
                <groupId>com.jolira</groupId>
                <artifactId>onejar-maven-plugin</artifactId>
                <version>1.4.4</version>
                <executions>
                    <execution>
                        <configuration>
                            <attachToBuild>true</attachToBuild>
                            <classifier>onejar</classifier>
                        </configuration>
                        <goals>
                            <goal>one-jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```



