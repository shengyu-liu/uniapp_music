import api from "./api";
const install:any = function apiFun(Vue) {
  if (install.installed) return;
  install.installed = true;
  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return api;
      }
    }
  });
};

export default {
  install
};