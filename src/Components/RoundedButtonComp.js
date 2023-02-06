import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProjectColors from '../Constants/ProjectColors';

export default RoundedButton = props => {
  return (
    <View style={[{flex: 1}]}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
        }}
        onPress={props.onPressHandler}>
        <View style={[styles.roundButtonStyle, styles.shadowProp]}>
          <Icon
            name={props.iconName}
            color={ProjectColors.activityColor}
            size={36}
          />
        </View>
        <Text style={styles.TextStyle}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  roundButtonStyle: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ProjectColors.white,
    height: 100,
    width: 100,
  },
  TextStyle: {
    color: ProjectColors.black,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
