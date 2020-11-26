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

### 编写TS组件的基本步骤

1. 引入相关资源：例如CSS等等

2. 写一个函数，函数内部return 一个类的实例，并且export

3. 编写实例，在此之前，先定义参数的interface，类的interface

4. 将类的interface使用inplements，并且将这些方法或者属性加到类里面

5. 初始化参数，设置默认参数

6. 编写其他逻辑

### 弹出层组件的实现

1. CSS模块化  import和require的区别：import是TS的语法，require是webpack的语法

使用popup.css.d.ts，声明文件，用于把popup.css这样的文件转换成TS认识的文件

2. Webpack中配置css-loader

我们配置了两部分的css-loader，一部分是针对src/components以外的文件夹，我们将其视作全局CSS，另一部分是针对src/components文件夹里面的CSS，这个一般是组件内部的CSS，CSS只应用于当前的组件。

### 播放器组件的实现
