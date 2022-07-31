const nav = require('./configs/nav.js')
const sidebar = require('./configs/sidebar.js')

module.exports = {
  // 网站标题
  title: 'SEA',
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
