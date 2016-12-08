/**
 * Created by sea35 on 2016/12/7.
 */
import React, {Component} from 'react'
import {StyleSheet, Alert, TouchableOpacity,WebView,Animated,PixelRatio,Image,View,Text,ScrollView} from 'react-native'
let Dimensions = require('Dimensions');// 宽高

import {getApi} from '../../utils';

var WIDTH_SIZE =Dimensions.get('window').width;

class DailyContent extends Component{
    constructor(props){
        super(props);
        this.state={
            html:'',
            data:{},
            scrollY: 0,
            scrollValue: new Animated.Value(0)
        }
        this.getHtml();
    }
    getHtml(){
        getApi.getDaily(this.props.dailyID,(data)=>{
            var oldHeader = '<div class="img-place-holder"></div>';
            var newHeader ='<div class="img-place-holder" style="overflow: hidden;position:relative;">'+
                            '<img style="margin-top:-100px;"  src="'+data.image+'" alt="">'+
                            '<div style="position:absolute;left:0px;bottom:0px;color:white;font-size: 18pt;padding-left: 10px;padding-right:20px;width:99%;opacity: 0.5;background-color:#6a6a6a;">'+this.props.dailyTitle+
                            '<div style="font-size: 13pt;text-align:right;padding-right:10px;">'+data.image_source+'</div></div>'+
                            '</div>';
            var html=data.body.replace(oldHeader,newHeader)
             html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
                + data.css[0]
                + '" /></head><body>' + html
                + '</body></html>';
            this.setState({html:html,data:data});
        },(err)=>{
            this.setState({html:'文章加载失败'});
        })
    }
    render(){
        if(!this.state.data){
            return;
        }
        return(
            <WebView
                style={[styles.webViewContainer,{flex:1}]}
                source ={{html:this.state.html}}
            >
            </WebView>
        )
    }
}
const  styles = StyleSheet.create({
    webViewContainer: {
        backgroundColor: 'rgb(240,240,240)',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default DailyContent;