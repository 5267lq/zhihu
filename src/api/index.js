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
    queryNewsInfo(id){
        return axios.get('/api/news_info',{
            params:{
                id
            }
        })
    },
    // 获取评论点赞信息
    queryNewsStory(id){
        return axios.get('/api/story_extra',{
            params:{
                id
            }
        })
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