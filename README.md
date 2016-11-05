# 图片占位应用

本应用主要是给网路提供图片服务

## 基本应用

    <img src="http://localhost:3000/400/300" />

图片地址中400是图片的宽度，300是图片的高度

## 扩展应用默认用法

    <img src="http://localhost:3000/400/300/?1" />

图片地址中?1代表获取不同的图片

## 扩展应用分类用法

    <img src="http://localhost:3000/400/300/city/?1" />

图片的分类包括：city：城市发展，travel：名胜古迹，figure：人物专访，scio：国新办特写

## 图片库位置

1. 默认用法的图片都放在public/pics目录下
2. 分类用法的图片放在public/picCategory目录下对应的文件夹里

## 图片占位后台管理地址

    http://localhost:3000/login

## 数据库使用的是Mongodb数据库

1. 建立images数据库，在images数据库下有user和picType两个表.
2. user表里有name,password,title三个字段。name是登录用户名、password是登录密码、title是用户中文名
3. picType表里有title,directory两个字段。title是中文目录名称、directory是英文目录名称


