import request from "./fetch";
const http = request.globalRequest;
const api: any = {}


api.login = (data: any) => {
    http("./login/cellphone", data);
}


// const api = {}
// const PORT1 = 'baseinfo'
// // 注册获取验证码
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'GET //必须大写，为了兼容其他应用', params, 1)

export default api