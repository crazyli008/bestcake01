module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // cnpm i vant@2.3.3 babel-plugin-import@1.13.0 -S 引入vant框架
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
};
