/**
 * Created by sea35 on 2016/10/10.
 */
import React, {Component} from 'react'
import {StyleSheet, Alert, TouchableOpacity} from 'react-native'
import {ListItem, ListScroll} from '../../components/base'
import {getApi} from '../../utils';
import DailyContent from './DailyContent';

class DailyList extends Component {
    constructor(props) {
        super(props);
        this._openContent = this._openContent.bind(this);
    }

    _openContent(id,title) {
        this.props.navigator.push({
            component: DailyContent,
            title:'详细内容',
            //params:{html:html}
            params:{dailyID:id,dailyTitle:title}
        })
    }
    // _getHtml(id){
    //     getApi.getDaily(id,(data)=>{
    //         var html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
    //             + data.css[0]
    //             + '" /></head><body>' + data.body
    //             + '</body></html>';
    //         this._openContent(html);
    //     },(err)=>{
    //         this._openContent('文章加载失败....');
    //     })
    // }
    _renderRow(rowData, SectionId, rowID) {
        const avatar=rowData.images[0];
        return (
            <TouchableOpacity onPress={()=>{this._openContent(rowData.id,rowData.title)}}>
                <ListItem
                    avatar={avatar}
                    key={rowID}
                    title={rowData.title}
                    avatarStyle={{
                        width: 60,
                        height: 60
                    }}
                    titleContainerStyle={{width: 300}}
                />
            </TouchableOpacity>
        )
    }

    render() {
        const getDataSource=function(pageNum,pageSize,loadDate){
           return function () {
               getApi.getDailyList(pageNum,(result)=>{
                   if (result) {
                       loadDate(result.stories)
                   }
                   else {
                       Alert.alert('系统提示', '获取数据失败');
                   }
               })
           }
        }
        return (
            <ListScroll
                getDataSource={getDataSource}
                renderRow={this._renderRow.bind(this)}
                pageSize={8}
            />
        )
    }
}

const styles = StyleSheet.create({})
module.exports = DailyList;

