/**
 * Created by sea35 on 2016/12/9.
 */
/**
 * Created by sea35 on 2016/12/9.
 */
import React, {Component} from 'react'
import {StyleSheet, Alert, TouchableOpacity,View} from 'react-native'
import {ListItem, ListScroll,NavigationBar} from '../../components/base'
import {getApi} from '../../utils';
import DailyContent from '../../components/Content/DailyContent';


class DailyList extends Component {
    constructor(props) {
        super(props);
        this._openContent = this._openContent.bind(this);
    }

    _openContent(id,title) {
        this.props.navigator.push({
            component: DailyContent,
            title:'详细内容',
            params:{dailyID:id,dailyTitle:title}
        })
    }
    _renderRow(rowData, SectionId, rowID) {
        let avatar =null;
        if(rowData.images){
            avatar=rowData.images[0];
        }
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
        const id=this.props.dailyID;
        const getDataSource=function(pageNum,pageSize,loadDate){
            return function () {
                getApi.getThemesList(id,pageNum,(result)=>{
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
            <View className={styles.container}>
                <ListScroll
                    getDataSource={getDataSource}
                    renderRow={this._renderRow.bind(this)}
                    pageSize={8}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFDB',

    },
})
module.exports = DailyList;

