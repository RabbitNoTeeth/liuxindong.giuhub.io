---
title: jekyll开发环境搭建(windows)
tags: jekyll
---



通过RubyInstaller构建jekyll开发环境



#### 1.下载RubyInstaller

进入[RubyInstaller Downloads](https://rubyinstaller.org/downloads/)下载**Ruby+Devkit**版本



#### 2.安装RubyInstaller

在RubyInstaller安装的最后一步中，选择执行 `ridk install` ，将弹出cmd窗口来选择所要安装的依赖，此时选择 3 

![ridk install]({{ "assets/illustration/20200104/ridkinstall.png" | absolute_url }})



#### 3.安装jekyll

打开cmd命令行串口，执行

```
gem install jekyll bundler
```



如果出现安装失败情况，可搜索`Start Command Prompt with Ruby`，打开该命令行进行安装

![**Start Command Prompt with Ruby**]({{ "assets/illustration/20200104/scpwr.png" | absolute_url }})



#### 4.验证jekyll安装

打开cmd命令行串口，执行

```
jekyll -v
```

若显示出jekyll版本号，则说明安装成功



#### 5.启动jekyll项目

① 进入jekyll项目，执行 `bundler install`，安装项目依赖

② 执行 `npm run serve` 启动jekyll项目

注：可能由于DataSourceNotFound Errors错误导致启动失败，此时可手动安装相关依赖解决：`gem install tzinfo-data`，[更多解决办法](https://github.com/tzinfo/tzinfo/wiki/Resolving-TZInfo::DataSourceNotFound-Errors)
