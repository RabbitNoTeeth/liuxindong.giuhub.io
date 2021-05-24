[TOC]



# 1 安装python

从[官网](https://www.python.org/downloads/)下载安装，python3或者python2都可。

安装完成后，一定要确认将python添加到环境变量中（python安装目录及/script目录）



# 2 安装相关依赖

```
pip install numpy Matplotlib
pip install opencv-python
```



# 3 验证

```
# 导入cv模块
import cv2 as cv

# 读取图像，支持 bmp、jpg、png、tiff 等常用格式
img = cv.imread("./blur.png")
# 创建窗口并显示图像
cv.namedWindow("Image")
cv.imshow("Image", img)
cv.waitKey(0)
# 释放窗口
cv.destroyAllWindows()
```



![](./resources/1.1.png)

