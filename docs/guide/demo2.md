# vitepress


VitePress 是 VuePress 的小弟弟，在 Vite 上构建的。

vitepress-theme-demoblock 是一个基于 Vitepress 的主题插件，它可以帮助你在编写文档的时候增加 Vue 示例，它的诞生初衷是为了降低编写组件文档时增加一些相关示例的难度。

## 创建项目

1.创建项目

![image-20220406114238701](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406114238701.png)

2.安装 vitepress，创建 docs 文件夹

```shell
yarn add --dev vitepress
mkdir && echo '# Hello VitePress' > docs/index.md

```

3.添加这些脚本到 package.json

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

![image-20220406114758249](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406114758249.png)

4.启动服务

```shell
yarn docs:dev
```

![image-20220406115227240](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406115227240.png)

## vitepress 配置

5.vitepress 配置

在 `docs` 目录下创建 `.vitepress` 目录即可开始设置配置

```shell
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

`.vitepress/config.js` 是配置 VitePress 站的必要的文件，其将导出一个 JavaScript 对象

```js
module.exports = {
  title: 'Hello VitePress',
  description: 'Just playing around.',
}
```

6.优化配置

优化后目录结构

```shell
.
├─ docs
│  ├─ .vitepress
|  |  ├─ configs
|  |  |  ├─ nav.js
|  |  |  ├─ sidebar.js
|  |  |  └─ utils.js
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

public 文件夹下是静态资源。

`config.js`

```js
const nav = require('./configs/nav.js')
const sidebar = require('./configs/sidebar.js')

module.exports = {
  // 网站标题
  title: 'Hello VitePress',
  // 网站描述
  description: 'Just playing around.',
  themeConfig: {
    // 顶部右上角导航
    nav,
    // 左侧导航
    sidebar,
    //丝滑滚动
    smoothScroll: true,
    // 启用时间线
    editLinks: true,
    //在git上编辑提示文字
    editLinkText: '在 GitHub 上编辑此页',
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: '上次更新',
  },
}
```

`nav.js`

```js
const { getPath } = require('./utils')

module.exports = [
  {
    text: '文档',
    link: '/guide/',
  },
]
```

`siderbar.js`

```js
const { getPath } = require('./utils')

module.exports = {
  [getPath('/guide/')]: getGuideSidebar(),
}

function getGuideSidebar() {
  return [
    {
      text: '文档',
      children: [
        {
          text: 'Demo1',
          link: '/guide/demo1',
        },
        {
          text: 'Demo2',
          link: '/guide/demo2',
        },
      ],
    },
  ]
}
```

`utils.js`

```js
// vitepress设置base后，sidebar会出现问题，手动补全path
exports.getPath = function (path) {
  return path
  // return path.replace('/', base)
}
```

最终结构目录

![image-20220406142205858](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406142205858.png)

运行效果

![image-20220406142222965](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406142222965.png)

![image-20220406142241040](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406142241040.png)

## vitepress-theme-demoblock

7.使用 vitepress-theme-demoblock

安装插件

```shell
yarn add -D vitepress-theme-demoblock
yarn add less
```

markdown 中的 vue 代码包含的 style 内容，会被组合成一个 style 统一处理，如果需要使用 css 预处理器，需要提前指定并且手动安装使用的 css 预处理器。

```js
markdown: {
  config: (md) => {
    const { demoBlockPlugin } = require('vitepress-theme-demoblock')
    md.use(demoBlockPlugin, {
      cssPreprocessor: 'less',
    })
  }
}
```

.vitepress/theme/index.js 中使用 vitepress-theme-demoblock 主题，并注册组件(包含主题中默认的组件)。

```js
import theme from 'vitepress/dist/client/theme-default'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import { registerComponents } from './register-components'

export default {
  ...theme,
  enhanceApp({ app, router, siteData }) {
    registerComponents(app)
  },
}
```

package.json 配置命令 scripts，vitepress-rc 用来注册组件(--docsDir 指定 docs 目录，--componentsDir 指定组件注册目录)

```js
"scripts": {
  "docs:dev": "yarn run register:components && vitepress dev docs",
  "docs:build": "yarn run register:components && vitepress build docs",
  "docs:serve": "vitepress serve docs",
  "register:components": "vitepress-rc"
}
```

8.在文件中编写 vue 文件

`demo1.md`

````md
# demo1

:::demo canvas 矩形的绘制

```vue
<template>
  <div class="rectangular">
    <div class="rectangular-box">
      <canvas id="rectangular" width="150" height="150"> </canvas>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  setup() {
    function draw() {
      const rectangular = document.getElementById('rectangular') //引用Dom元素
      const ctx = rectangular.getContext('2d')
      //函数绘制了一个边长为100px的黑色正方形
      ctx.fillRect(25, 25, 100, 100)
      //函数从正方形的中心开始擦除了一个60*60px的正方形
      ctx.clearRect(45, 45, 60, 60)
      //函数从正方形的中心开始擦除了一个60*60px的正方形
      ctx.strokeRect(50, 50, 50, 50)
    }
    onMounted(() => {
      draw()
    })
  },
}
</script>
```

:::
````

效果

![image-20220406143312941](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406143312941.png)

## 自定义样式

9.自定义样式

```shell
yarn add -D stylus stylus-loader
```

`.vitepress` 文件夹下新建 `custom.styl` 文件

![image-20220406144953634](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220406144953634.png)

10.预览

![Gif_948](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/Gif_948.gif)

## 导入 Threejs 模块

在 config.js 文件中添加`scriptImports: ["import * as THREE from 'three'"]`,全局导入

![image-20220407114115783](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/image-20220407114115783.png)

查看测试效果，[获取相同代码](http://club.lichee.top/)

![Gif_600](http://lichee-img.oss-cn-hangzhou.aliyuncs.com/csdn/img/Gif_600.gif)
