/**
 * Created by sea35 on 2016/12/7.
 */
import React, { Component } from 'react';
import {
    Navigator,Text, StatusBar, View, TouchableOpacity, StyleSheet, Alert, BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import App from './containers/App';

const defaultRoute = {
    component: App,
    title:'知乎日报'
};

export default class NavIndex extends Component {
    _renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component {...route.params} navigator={navigator} />
        );
    }
    LeftButton(route, navigator, index, navState) {
       if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {
                            if (index > 0) {
                                navigator.pop()
                            }
                        }}
                    >
                        <Icon
                            style={styles.leftNavButtonText}
                            name='chevron-left'/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    RightButton(route, navigator, index, navState) {
        let _component = route.component.WrappedComponent || route.component;
        let _prototype = _component.prototype;
        if (_prototype._navRight)
            return _prototype._navRight({route, navigator, index, navState}, _prototype)
    }

    Title(route, navigator, index, navState) {
        if (typeof(route.title) == 'string') {
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <StatusBar backgroundColor='#ff4971'/>
                    <Text style={styles.navBarTitle}>
                        {route.title}
                    </Text>
                </View>
            );
        }
        //return route.title();
    }
    render() {
        var navBar = {
            LeftButton: this.LeftButton,
            RightButton: this.RightButton,
            Title: this.Title
        };
        navBar.LeftButton = this.props.leftButton || navBar.LeftButton;
        navBar.Title = this.props.title || navBar.Title;
        navBar.RightButton = this.props.rightButton || navBar.RightButton;
        return (
            <Navigator
                navigationBar={
                    <Navigator.NavigationBar
                        style={[{backgroundColor: '#F8F8F8', flex: 1, height: 62,}, this.props.barStyle]}
                        routeMapper={navBar}
                        navigationStyles={Navigator.NavigationBar.StylesIOS}/>
                }
                initialRoute={defaultRoute}
                renderScene={this._renderScene}
                style={[styles.navContainer, {paddingTop: 62}]}
            />
        );
    }
}

const styles = StyleSheet.create({
    // 导航栏
    navContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#383838',
        fontSize: 33,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    navBarTitle: {
        fontSize: 18,
        lineHeight: 35,
        color: '#383838',
        fontFamily: 'PingFang SC'
    }
});