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
  getShowDataOne(data) {
    // 女神和乳品的调接口的方式 抓取回来的数据，除了vcm还有Nmae，m不是固定了，需要动态传
    //获取详情页数据，知道要传参数        Name: data.Name, c: "NsCakeCenter", m: data.m,v: Date.now()  http://m.bestcake.com/json1811.ashx?Name=%E4%B8%80%E8%A7%81%E5%80%BE%E5%BF%83&c=NsCakeCenter&m=GetNSCakeByName&v=1578127197501
    return request({
      method: "GET",
      url: "/json1811.ashx",
      params: {
        Name: data.Name,
        c: "NsCakeCenter",
        m: data.m,
        v: Date.now()
      }
    });
  }
};
export default new Apis();
