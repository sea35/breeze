import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // leftTitle和leftImage 优先判断leftTitle (即 文本按钮和图片按钮优先显示文本按钮)
        const { title, leftTitle, leftImage, leftAction, rightTitle, rightImage, rightAction ,leftIcon,rightIcon} = this.props;
        return (
            <View style={[styles.barView, this.props.style]}>
                <View style={ styles.showView }>
                    {
                        leftTitle
                            ?
                            <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.barButton}>{leftTitle}</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            (
                                leftImage
                                    ?
                                    <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                                        <View style={{alignItems: 'center'}}>
                                            <Image source={ leftImage }/>
                                        </View>
                                    </TouchableOpacity>
                                    : (
                                  leftIcon?
                                      <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                                          <View style={{alignItems: 'center'}}>
                                              <Icon
                                                  size={28}
                                                  style={[styles.icon, leftIcon.style && leftIcon.style]}
                                                  name={leftIcon.name}
                                                  color={leftIcon.color || colors.grey4}
                                              />
                                          </View>
                                      </TouchableOpacity>
                                      :null
                                )
                            )
                    }
                    {
                        title ?
                            <Text style={styles.title}>{title || ''}</Text>
                            : null
                    }
                    {
                        rightTitle ?
                            <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.barButton}>{rightTitle}</Text>
                                </View>
                            </TouchableOpacity>
                            : (rightImage ?
                                <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                                    <View style={{alignItems: 'center'}}>
                                        <Image source={ rightImage }/>
                                    </View>
                                </TouchableOpacity>
                                : (
                                rightIcon?
                                    <TouchableOpacity style={styles.leftNav} onPress={ ()=>{rightAction()} }>
                                        <View style={{alignItems: 'center'}}>
                                            <Icon
                                                style={[styles.icon, rightIcon.style && rightIcon.style]}
                                                name={rightIcon.name}
                                                color={rightIcon.color || colors.grey4}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    :null
                            )
                        )
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barView: {
        height: Platform.OS === 'android' ? 44 : 64,
        backgroundColor: '#f4f4f4' //'#4E78E7',
    },
    icon: {
        fontSize: 33,
        justifyContent: 'center',
        color:colors.grey0
    },
    showView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? 0 : 20,
        height: 44,
    },
    title: {
        color: colors.grey0,//'white',
        fontSize: 18.0,
    },
    leftNav: {
        position: 'absolute',
        top: 8,
        bottom: 8,
        left: 8,
        justifyContent: 'center',
    },
    rightNav: {
        position: 'absolute',
        right: 8,
        top: 8,
        bottom: 8,
        justifyContent: 'center',
    },
    barButton: {
        color: colors.grey0//'white'
    },
})
export default NavigationBar