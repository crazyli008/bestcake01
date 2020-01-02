import request from "./http";
// import qs from "qs";
const Apis = class {
  getIndexData() {
    return request({
      method: "GET",
      url: "/json1811.ashx",
      params: {
        c: "NewIndexController",
        m: "index",
        v: Date.now()
      }
    });
  }
};
export default new Apis();
