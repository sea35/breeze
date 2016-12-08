/**
 * Created by sea35 on 2016/11/9.
 */
import React, {Component, PropTypes} from 'react';
import {ListView, RefreshControl, View, Text, StyleSheet, Alert} from 'react-native';

import {httpHelper} from '../../../utils';

const moreText = "加载完毕";    //foot显示的文案
//页码
var pageNum = 1;
//页面List总数据
var totalList = new Array();
var me=null;

//foot：  0 隐藏  1  已加载完成   2  显示加载中 3 隐藏(总记录小于每页的记录数)

class ListScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            hLoaded: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            loaded: false,//控制Request请求是否加载完毕
            foot: 0,// 控制foot， 0：隐藏foot  1：已加载完成   2 ：显示加载中
            error: false,
        }
        me=this;
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            this.setState({
                hLoaded: this.state.hLoaded + 5,
                isRefreshing: false,

            });
            totalList = new Array();
            pageNum = 1;
            this._fetchListData();
        }, 500);
    }

    componentWillMount() {
        this._fetchListData();
    }

    _loadDate(data) {
        var pageSize = me.props.pageSize;
        let list = data;
        let currentCount = list.length;

        if (pageNum == 1) {
            totalList = new Array()
        }

        for (var i = 0; i < list.length; i++) {
            totalList.push(list[i]);
        }
        if (totalList.length < pageSize) {
            //当总记录数据小于PageSize时，认为已加载完毕，但不显示footer
            me.setState({foot: 3});
        }
        else if (currentCount < pageSize) {
            //当当前返回的数据小于PageSize时，认为已加载完毕
            me.setState({foot: 1, moreText: moreText});
        } else {//设置foot 隐藏Footer
            me.setState({foot: 0});
        }


        me.setState({
            dataSource: me.state.dataSource.cloneWithRows(totalList),
            loaded: true,
        });
    }

    _fetchListData() {
        if (pageNum > 1) {
            this.setState({loaded: true});
        }

        if (this.props.getDataSource) {
            this.props.getDataSource(pageNum,this.props.pageSize,this._loadDate)();
        } else {
            var params = {
                ...this.props.dataSource.params,
                pageSize: this.props.pageSize,
                pageNum: pageNum
            }

            httpHelper.post(this.props.dataSource.uri, params, (data) => {
                if (data.code == 0) {
                    this._loadDate(data.data);
                }
                else {
                    Alert.alert('系统提示', '获取数据失败,' + data.message);
                }
            }, (err) => {
                Alert.alert('系统提示', err.toString());
            });
        }
    }

    _renderRow(rowData, SectionId, rowID) {
        return this.props.renderRow(rowData, SectionId, rowID);
    }

    _renderFooter() {
        if (this.state.foot === 1) {//加载完毕
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        {this.state.moreText}
                    </Text>
                </View>);
        } else if (this.state.foot === 2) {//加载中
            return (
                <View style={{height:40,alignItems:'center',justifyContent:'center',}}>
                    {/*<Image source={{uri:loadgif}} style={{width:20,height:20}}/>*/}
                    <Text style={{color:'#999999',fontSize:12,marginTop:10}}>
                        {'正在加载中...'}
                    </Text>
                </View>);
        }
    }

    _endReached() {
        if (this.state.foot != 0) {
            return;
        }
        this.setState({
            foot: 2,
        });
        this.timer = setTimeout(
            () => {
                pageNum++;
                this._fetchListData();
            }, 500);
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor="#ff0000"
                        title="正在加载..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />
                }
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(rowData,SectionId,rowID) => {return this.props.renderRow(rowData,SectionId,rowID)}}
                renderFooter={this._renderFooter.bind(this)}
                onEndReached={this._endReached.bind(this)}
                onEndReachedThreshold={0}
            />
        )
    }
}

ListScroll.defaultProps = {
    pageSize: 7
}

ListScroll.propTypes = {
    getDataSource: PropTypes.func,
    dataSource: React.PropTypes.shape({
        uri: React.PropTypes.string,
        params: React.PropTypes.object
    }),
    renderRow: PropTypes.func,
    pageSize: PropTypes.number,
    onPress: PropTypes.func
}

export default ListScroll;
