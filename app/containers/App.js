/**
 * Created by sea35 on 2016/12/2.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabNavigator} from '../components/base';

import DailyList from './Daily/DailyList';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedTab: 'home'
        }
    }
    renderContent(pageText) {
        return (
            <Text>{pageText}</Text>
        )}
    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() => <Icon name="book" size={25} color="#929292"/>}
                    renderSelectedIcon={() => <Icon name="book" size={25} color="rgb(0, 122, 255)"/>}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <DailyList title="知乎日报" navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="Profile"
                    renderIcon={() => <Icon name="book" size={25} color="#929292"/>}
                    renderSelectedIcon={() => <Icon name="book" size={25} color="rgb(0, 122, 255)"/>}
                    onPress={() => this.setState({ selectedTab: 'profile' })}>
                    {this.renderContent('Profile')}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}

export default App;