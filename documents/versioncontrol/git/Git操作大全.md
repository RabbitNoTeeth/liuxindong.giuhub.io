[TOC]



# 1 版本库

## 1.1 初始化版本库

```
cd xxx      // 进入要初始化版本库的目录xxx
git init 		// 初始化版本库
```



## 1.2 创建版本库副本

```
git clone aaa bbb     // 创建版本库aaa的副本，副本命名为bbb
```



## 1.3 添加文件版本库

```
git add xxx    // 将文件xxx添加到版本库中
git add .      // 将当前目录及其子目录中的文件添加到版本库中
```



## 1.4 删除文件

```
git rm xxx     // 删除文件或者目录xxx
```



## 1.5 重命名文件

```
git mv aaa bbb    // 将文件aaa重命名为bbb
```



## 1.6 查看版本库状态

```
git status
```



## 1.7 提交变更

```
git commit xxx          // 提交文件或者目录xxx的变更到版本库
git commit              // 提交所有变更到版本库
git commit -m 'xxx'     // 提交所有变更到版本库，同时设置提交说明为xxx
```



## 1.8 查看提交记录

```
git log											 // 查看版本库所有分支的提交记录
git show xxx                 // 查看提交记录id为xxx的提交详情
git show-branch --more=10    // 查看当前分支的提交记录，最多显示10条，可以根据需要自定义最大条数
git diff aaa bbb             // 查看提交记录id为aaa与bbb两者的差异
```



# 2 配置文件

## 2.1 修改配置

```
git config --global user.name "liuxindong"             // 全局设置user.name属性值为liuxindong
git config --global user.email "864426487@qq.com"      // 全局设置user.email属性值为864426487@qq.com
git config user.name "liuxindong"                      // 设置当前版本库中user.name属性值为liuxindong
git config user.email "864426487@qq.com"               // 设置当前版本库中user.email属性值为864426487@qq.com
```

当版本库的配置与全局配置的同一属性有不同值时，在此版本库中版本库配置优先级大于全局配置。



## 2.2 移除配置

```
git config --unset --global user.name    // 移除全局配置项user.name
git config --unset user.name             // 移除当前版本库配置项user.name
```



## 2.3 查看配置

```
git config -l      // 查看所有配置，包括全局配置与版本库配置
```



## 2.4 配置命令别名

设置命令 `log --graph --abbrev-commit --pretty=oneline` 的别名为 `show-graph`，调用时只需输入 `git show-graph`

```
git config --global alias.show-graph 'log --graph --abbrev-commit --pretty=oneline'
```

