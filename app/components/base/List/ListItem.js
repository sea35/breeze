import React, { PropTypes } from 'react'
import { View, StyleSheet, TouchableHighlight, Image, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Text from '../Text/Text'
import colors from '../config/colors'
import fonts from '../config/fonts'
let styles

const ListItem = ({
  onPress,
  title,
  rightTitle,
  rightTitleStyle,
  icon,
  rightIcon,
  avatar,
  avatarStyle,
  underlayColor,
  subtitle,
  subtitleStyle,
  containerStyle,
  wrapperStyle,
  titleStyle,
  hideChevron,
  chevronColor,
  roundAvatar,
  component,
  fontFamily,
  imgSource,
  rightImg,
  rightImgStyle,
  titleContainerStyle
}) => {
  let Component = onPress ? TouchableHighlight : View
  if (component) {
    Component = component
  }
  return (
    <Component
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, containerStyle && containerStyle]}>
      <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
        {
          icon && icon.name && (
            <Icon
              size={28}
              style={[styles.icon, icon.style && icon.style]}
              name={icon.name}
              color={icon.color || colors.grey4}
            />
          )
        }
        {
          avatar && (
            <Image
              style={[
                styles.avatar,
                roundAvatar && {borderRadius: 17},
                avatarStyle && avatarStyle]}
              source={{uri: avatar}}
              />
          )
        }{ imgSource &&(
            <Image
              style={[
                styles.avatar,
                roundAvatar && {borderRadius: 17},
                avatarStyle && avatarStyle]}
              source={imgSource}
              />
          )
        
        }
        <View style={[styles.titleContainer,titleContainerStyle && titleContainerStyle]}>
          <Text
            style={[
              styles.title,
              titleStyle && titleStyle,
              !icon && {marginLeft: 10},
              fontFamily && {fontFamily}
            ]}>{title}</Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                !icon && {marginLeft: 10},
                subtitleStyle && subtitleStyle,
                fontFamily && {fontFamily}
              ]}>{subtitle}</Text>
          )}
        </View>
        {
          (
            <View style={styles.chevronContainer}>
              <View style={styles.rightTitleContainer}>
              { rightTitle && rightTitle!='' && (
                  <Text
                      style={[
                        styles.rightTitle,
                        rightTitleStyle && rightTitleStyle,
                        fontFamily && {fontFamily}
                      ]}>{rightTitle}</Text>)
              }
                { rightImg &&(
                    <Image
                        style={[
                          styles.avatar,
                          roundAvatar && {borderRadius: 17},
                          rightImgStyle && rightImgStyle]}
                        source={rightImg}
                    />
                )

                }
                {onPress && !hideChevron &&(<Icon
                  style={styles.chevron}
                  size={28}
                  name={rightIcon}
                  color={chevronColor} />)}

                </View>
            </View>
          )
        }
      </View>
    </Component>
  )
}

ListItem.defaultProps = {
  underlayColor: 'white',
  chevronColor: colors.grey4,
  rightIcon: 'chevron-right',
  hideChevron: false,
  roundAvatar: false
}

ListItem.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.any,
  icon: PropTypes.any,
  imgSource:PropTypes.any,
  onPress: PropTypes.func,
  rightIcon: PropTypes.string,
  underlayColor: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  hideChevron: PropTypes.bool,
  chevronColor: PropTypes.string,
  roundAvatar: PropTypes.bool,
  rightTitle:PropTypes.any,
  rightTitleStyle:PropTypes.any,
  titleContainerStyle:PropTypes.any,
}

styles = StyleSheet.create({
  avatar: {
    width: 34,
    height: 34
  },
  container: {
    padding: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 10
  },
  title: {
    fontSize: 15,
    color: colors.grey1,
    marginTop: -2
  },
  subtitle: {
    color: colors.grey3,
    fontSize: 12,
    marginTop: 1,
    ...Platform.select({
      ios: {
        fontWeight: '600'
      },
      android: {
        fontFamily: fonts.android.bold
      }
    })
  },
  titleContainer: {
    justifyContent: 'center',
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTitleContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTitle: {
    fontSize: 15,
    height: 23,
    justifyContent: 'center',
    color: colors.grey1
  },
  chevron: {
  }
})

export default ListItem
