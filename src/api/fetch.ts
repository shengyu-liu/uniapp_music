import urlConfig from './config'

const request:any = {}
    
request.globalRequest = (url, data) => {
    return uni.request({
        url: urlConfig + url,
        data: data,
    })
 } 

export default request