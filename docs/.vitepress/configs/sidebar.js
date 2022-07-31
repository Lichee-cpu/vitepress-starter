const { getPath } = require("./utils");

module.exports = {
  [getPath("/guide/")]: getGuideSidebar(),
};

function getGuideSidebar() {
  return [
    {
      text: "文档",
      collapsible: true, // 可折叠
      // collapsed: true, // 默认折叠
      items: [
        {
          text: "Demo1",
          link: "/guide/demo1",
        },
      ],
    },
  ];
}


