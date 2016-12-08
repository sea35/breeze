/**
 * 获取知乎日报数据
 * Created by sea35 on 2016/12/7.
 */
import httpHelper from './httpHelper';
import moment from 'moment';

module.exports={
    /**
     * 根据时间获取日报数据列表(最长一周的数据)
     * @param page 页码
     * @param callback  {"images":["http:\/\/pic2.zhimg.com\/44bf33fe18e93de90056a30bc00a9f7d.jpg"],"type":0,"id":9042669,"ga_prefix":"120622","title":"小事 · 走，去捐精"}
     * @param err
     */
    getDailyList:(page,callback,err)=>{
        if(page>7){
            callback(null);
            return;
        }
        const date = moment().add(1-page, 'days').format('YYYYMMDD');
        const url='http://news.at.zhihu.com/api/4/news/before/'+date;
        httpHelper.get(url,null, callback,err);
    },
    /**
     * 消息内容获取
     * @param id       文章ID
     * @param callback
     * @param err
     */
    getDaily:(id,callback,err)=>{
        const url='http://news-at.zhihu.com/api/4/news/'+id;
        httpHelper.get(url,null,callback,err);
    }

}