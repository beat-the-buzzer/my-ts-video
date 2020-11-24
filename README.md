## 基于TypeScript开发播放器组件

### 为什么使用TypeScript

1. TypeScript 可以提供静态类型检查，规范团队的编码，适合大型项目的开发

2. IDE的友好提示

### Webpack搭建项目环境

```shell
npm init -y
npm install -D webpack@4.43.0 webpack-cli@3.11.0 # 安装webpack 注意版本，最新的和下面的webpack-dev-server冲突了，暂时先使用4
# 新建一个webpack.config.js
npm install -D style-loader css-loader # 处理CSS
npm install -D html-webpack-plugin # html引用文件
npm install -D clean-webpack-plugin # 清理文件
npm install -D webpack-dev-server # 热更新 运行的时候打包到内存中
# 新增iconfont
npm install -D file-loader # 文件loader
npm install -D ts-loader typescript # ts相关
# 新建一个tsconfig.json
# 配置webpack的extensions，优先匹配ts文件。
```

### 组件开发的关键点

1. 给使用者

使用TypeScript可以详细定义组件的配置项，这样我们在使用的时候，就知道哪些字段是必传项，字段的数据类型等信息，其实这些也是要写在接口文档里面的；

2. 给开发者

开发一个组件的时候，我们需要知道这个组件内部需要实现哪些功能，需要有哪些方法等等，尤其是在做大型项目的时候，可能需要一个团队开发一个大组件，我们都要先明确自己需要哪些东西，先计划好，然后再进行开发；

### 弹出层组件的实现

### 播放器组件的实现
