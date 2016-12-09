/**
 * Created by sea35 on 2016/12/9.
 */
import React, {Component} from 'react'
import {StyleSheet, Alert, TouchableOpacity,View} from 'react-native'
import {ListItem, ListScroll,NavigationBar} from '../../components/base'
import {getApi} from '../../utils';
import ThemesListDetails from './ThemesListDetails';



class DailyList extends Component {
    constructor(props) {
        super(props);
        this._openContent = this._openContent.bind(this);
    }

    _openContent(id,title) {
        this.props.navigator.push({
            component: ThemesListDetails,
            title:'主题列表',
            params:{dailyID:id,dailyTitle:title}
        })
    }
    _renderRow(rowData, SectionId, rowID) {
        const avatar=rowData.thumbnail;
        return (
            <TouchableOpacity onPress={()=>{this._openContent(rowData.id,rowData.name)}}>
                <ListItem
                    avatar={avatar}
                    key={rowID}
                    title={rowData.name}
                    subtitle={rowData.description}
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
                getApi.getThemes(pageNum,(result)=>{
                    if (result) {
                        loadDate(result.others)
                    }
                    else {
                        Alert.alert('系统提示', '获取数据失败');
                    }
                })
            }
        }
        return (
            <View className={styles.container}>
                <NavigationBar title={'主题日报'}/>
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

