import axios from "./http";
export default {
    // 获取今日新闻
    queryNewsLatest() {
        return axios.get('/api/news_latest')
    },
    // 获取往日新闻
    queryNewsBefore(time) {
        return axios.get('/api/newsbefore', {
            params: {
                time
            }
        })
    },

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