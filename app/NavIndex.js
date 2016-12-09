/**
 * Created by sea35 on 2016/12/7.
 */
import React, { Component } from 'react';
import {
    Navigator,Text, StatusBar, View, TouchableOpacity, StyleSheet, Alert, BackAndroid,Platform
} from 'react-native';
import { NavigationBar} from './components/base'
import App from './containers/App';


const defaultRoute = {
    component: App,
    params:{
        hideNavBar:true
    }
};

export default class NavIndex extends Component {
    constructor(props){
        super(props);
    }
    _renderScene(route, navigator) {
        let Component = route.component;
        if(route.params && !route.params.hideNavBar){
         return(<View style={{flex:1}}>
                <NavigationBar title={route.title||''} leftIcon={{name:"chevron-left"}}   leftAction={ ()=>{navigator.pop()} } />
                <Component {...route.params} navigator={navigator}/>
            </View>)
        }else {
        return (
                <Component {...route.params} navigator={navigator}/>
        );
        }
    }
    render() {
        return (
            <Navigator
                initialRoute={defaultRoute}
                renderScene={this._renderScene}
            />
        );
    }
}

const styles = StyleSheet.create({

});