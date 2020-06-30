# 基于react + node 开发的后台管理系统

## 运行
项目整体希望前后端分离，所以未合并package.json
```
react运行
    cd coke_react    
    cnpm i
    cnpm run start

node运行
    cd coke_node
    cnpm i
    cnpm run start
```

## react
```
scss模块化，css非模块化
通过webpack配置，将scss文件结尾文件实现模块化，而css结尾不做模块化处理，也就是说引入的css文件都将是全局的

全局统一路径配置
配置全局统一路径 @ 相当于coke_react文件夹下的src
```

## node
```
    node部分整体，并未连接数据库
    登录注册使用的是本地json文件的读写
```

