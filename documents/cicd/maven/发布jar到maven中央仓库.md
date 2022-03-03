[TOC]



# 1 注册 sonatype 账号 

注册地址：https://issues.sonatype.org/secure/Signup!default.jspa

注意：邮箱一定要填写正确，因为后续issue有任何变动都会通过邮件来通知。



# 2 创建 sonatype issue

① 打开 https://issues.sonatype.org/，登录第1步中注册好的账号

② 点击导航栏中的“新建”按钮来创建issue

![](./resources/1.1.png)

③ 填写表单

- Project

  选择【Community Support - Open Source Project Repository Hosting (OSSRH)】

- Issue Type

  选择【New Project】

- Summary

  自己填，要用英文，一般写要发布的项目名称即可。

- Description

  自己填，要用英文。

- Group Id

  如果使用 github 或者 gitee，那么格式为 `com.github.用户名`  或者 `com.gitee.用户名`  。

  如果有自己的域名和项目地址也可以，官方人员会询问你是否有这个域名的所有权。

  在你项目的pom里一定要使用这个Group Id，最好包路径也使用。

- Project URL
  项目地址

- SCM url
  项目git地址

- Username(s)
  可以不用填,这是能辅助你提交项目的合作人的帐号,前提是他也得在这个Jira注册

④ issue 创建后，等待一段时间，将收到 sonatype 发送的邮件，邮件中明确说明了后续应该如何操作，按照邮件内容操作即可。



# 3 生成密钥对

① 下载安装 [Gpg4win](https://www.gpg4win.org/download.html) （非windows用户请在 [GunPG](https://www.gnupg.org/) 官网下载自己操作系统对应的程序）。

② 打开命令行

- 生成密钥对

  ```
  $ gpg --gen-key
  ```

  根据提示输入 Real name（用户名） 和 Email address（邮箱），然后输入两次 Passphase（密钥库密码），这个一定要保存起来，后面会用到。

- 查看公钥

  ```
  $ gpg --list-keys
  pub   ed25519 2022-03-03 [SC] [expires: 2024-03-03]
        3F97A47E90BCEA6059B9281D8B125471433FD829
  uid           [ultimate] local <RabbitNoTeeth@163.com>
  sub   cv25519 2022-03-03 [E] [expires: 2024-03-03]
  ```

  3F97A47E90BCEA6059B9281D8B125471433FD829 就是公钥的指纹。

- 将公钥发布到PGP 密钥服务器

  ```
  $ gpg --keyserver hkp://keyserver.ubuntu.com/ --send-keys 3F97A47E90BCEA6059B9281D8B125471433FD829 
  ```



# 4 修改 maven 配置文件

打开文件 `maven安装目录/conf/settings.xml`，在标签 `<servers>...</servers>` 中添加

```xml
<server>
      <id>ossrh</id>
      <username>sonatype用户名</username>
      <password>sonatype密码</password>
</server>
```



# 5 修改项目 pom.xml 文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <packaging>pom</packaging> <!-- 如果是单模块项目，那么需要设置为 jar -->

    <groupId>com.gitee.rabbitnoteeth</groupId>
    <artifactId>bedrock</artifactId>
    <version>${project.deploy.version}</version>

    <name>bedrock</name>
    <description>development toolkit</description>
    <url>https://gitee.com/RabbitNoTeeth/bedrock</url>

    <modules>
        <module>bedrock-core</module>
        <module>bedrock-http</module>
        <module>bedrock-mqtt</module>
        <module>bedrock-snmp</module>
    </modules>

    <properties>
        <java.version>11</java.version>
        <vertx.version>4.1.2</vertx.version>
        <springboot.version>2.4.5</springboot.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.deploy.version>1.0.0</project.deploy.version>
    </properties>

    <profiles>
        <profile>
            <id>snapshot</id>
            <properties>
                <project.release.version>1.0.0-SNAPSHOT</project.release.version>
            </properties>
        </profile>
        <profile>
            <id>release</id>
            <properties>
                <project.release.version>1.0.0</project.release.version>
            </properties>
        </profile>
    </profiles>

    <licenses>
        <license>
            <name>The Apache Software License, Version 2.0</name>
            <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
        </license>
    </licenses>

    <developers>
        <developer>
            <name>RabbitNoTeeth</name>
            <email>RabbitNoTeeth@163.com</email>
        </developer>
    </developers>

    <scm>
        <connection>scm:git:git@gitee.com:RabbitNoTeeth/bedrock.git</connection>
        <developerConnection>scm:git:git@gitee.com:RabbitNoTeeth/bedrock.git</developerConnection>
        <url>git@gitee.com:RabbitNoTeeth/bedrock.git</url>
    </scm>

    <dependencies>
        ...
    </dependencies>

    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>
        <repository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.sonatype.plugins</groupId>
                <artifactId>nexus-staging-maven-plugin</artifactId>
                <version>1.6.7</version>
                <extensions>true</extensions>
                <configuration>
                    <serverId>ossrh</serverId>
                    <nexusUrl>https://s01.oss.sonatype.org/</nexusUrl>
                    <autoReleaseAfterClose>true</autoReleaseAfterClose>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-gpg-plugin</artifactId>
                <version>1.5</version>
                <executions>
                    <execution>
                        <id>sign-artifacts</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>sign</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>2.2.1</version>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>3.0.0</version>
                <executions>
                    <execution>
                        <id>attach-javadocs</id>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.6.1</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>

```



# 6 发布

- 发布 snapshot 版本

  ```
  $ mvn clean deploy -P snapshot
  ```

- 发布 release 版本

  ```
  $ mvn clean deploy -P release
  ```

jar包发布成功后，先到 https://s01.oss.sonatype.org/ 仓库中，如果项目pom文件中 `autoReleaseAfterClose` 属性为 true，那么将自动release。否则，项目将先进入 staging 状态，此时需要使用第1步中注册的账号登录到 https://s01.oss.sonatype.org/ 仓库，找到 **Staging Repositories** 并点击进入

![](./resources/1.4.png)



在列表中找到要 release 的项目，手动进行 release。