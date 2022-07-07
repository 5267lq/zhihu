import axios from "./http";
export default {
    // 获取今日新闻
    queryNewsLatest() {
        return axios.get('/api/news_latest')
    },
    // 获取往日新闻
    queryNewsBefore(time) {
        return axios.get('/api/news_before', {
            params: {
                time
            }
        })
    },
    // 获取新闻详情
    queryNewsInfo(id) {
        return axios.get('/api/news_info', {
            params: {
                id
            }
        })
    },
    // 获取评论点赞信息
    queryNewsStory(id) {
        return axios.get('/api/story_extra', {
            params: {
                id
            }
        })
    },
    //登录接口
    login(phone, code) {
        return axios.post('/api/login', { phone, code })
    },
    //获取手机验证码
    phoneCode(phone) {
        return axios.post('/api/phone_code', { phone })
    },
    //-----------------token--------------------
    //检测是否登录
    checkLogin() {
        return axios.get('/api/check_login')
    },
    //获取登录者信息
    userInfo() {
        return axios.get('/api/user_info')
    },
    userUpdate(username, file) {
        let fm = FormData()
        fm.append("username", username)
        fm.append("file", file)
        return axios.post('/api/user_update', fm)
    },
    //收藏新闻
    store(newsId) {
        return axios.post('/api/store', newsId)
    },
    //移除收藏
    storeRemove(id) {
        return axios.get('/api/store_remove', {
            params: {
                id
            }
        })
    },
    //获取收藏列表
    getStore() {
        return axios.get('/api/store_list')
    }
}

// [
//     {
//         time:'20220626',
//         stories:[{},...]
//     },
//     {
//         time:'20220625',
//         stories:[{},...]
//     },
//     {
//         time:'20220624',
//         stories:[{},...]
//     },
//     ...
// ]