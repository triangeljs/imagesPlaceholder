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

1、默认用法的图片都放在public/pics目录下
2、分类用法的图片放在public/picCategory目录下对应的文件夹里