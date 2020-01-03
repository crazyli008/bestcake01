import request from "./http";
const Apis = class {
  getIndexData() {
    //获取首页的数据
    return request({
      method: "GET",
      url: "/json1811.ashx",
      params: {
        c: "NewIndexController",
        m: "index",
        v: Date.now() //时间戳
      }
    });
  }
  getClassData() {
    // 获取分类页的数据http://m.bestcake.com/json1811.ashx?v=1578021954476&c=NsCakeCenter&m=GetJdListNew先看主机是否切换，如果有，代理重新配置，没有就改对应的参数
    return request({
      method: "GET",
      url: "/json1811.ashx",
      params: {
        c: "NsCakeCenter",
        m: "GetJdListNew",
        v: Date.now()
      }
    });
  }
};
export default new Apis();
