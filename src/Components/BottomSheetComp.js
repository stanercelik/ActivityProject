import React from 'react';
import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
import ProjectColors from '../Constants/ProjectColors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BottomSheet from '../Components/BottomSheet';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

export default BottomSheetComp = props => {
  return (
    <BottomSheet
      ref={props.bottomSheetRef}
      activeHeight={props.height * 0.85}
      backgroundColor={ProjectColors.activityColor}
      backDropColor={'black'}>
      <View
        style={{
          flex: 1,
          paddingVertical: 12,
          //alignItems: 'center',
        }}>
        <Text style={styles.bottomsheetTextStyle}>
          Your current activity is
        </Text>
        <Text style={styles.bottomSheetActivityStyle}>{props.activity}</Text>
        <Text style={styles.bottomSheetActivityStyle}>{props.timeText}</Text>
        <Text style={styles.bottomsheetTextStyle}>
          You are about to change to:
        </Text>
        <View
          style={{
            height: '14%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Icon
            style={{marginRight: 10}}
            name={props.iconName}
            //IconButtonList[tmpindx].iconName
            color={ProjectColors.white}
            size={50}
          />
          <Text style={styles.iconTextStyle}>
            {
              //IconButtonList[tmpindx].text
              props.iconText
            }
          </Text>
        </View>
        <Text style={styles.bottomsheetTextStyle}>
          Do you want to change your activity?
        </Text>
        <TouchableOpacity
          style={styles.ModalButtonStyle}
          onPress={props.modalOnPress}>
          <Text style={styles.ModalButtonTextStyle}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomsheetTextStyle: {
    alignSelf: 'center',
    height: '11%',
    color: ProjectColors.white,
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 2,
  },
  bottomSheetActivityStyle: {
    height: '11%',
    alignSelf: 'center',
    color: ProjectColors.white,
    fontSize: 32,
    fontWeight: '500',
  },
  iconTextStyle: {
    color: ProjectColors.white,
    fontSize: 38,
    fontWeight: '700',
  },
  ModalButtonStyle: {
    borderRadius: 12,
    paddingVertical: 8,
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: ProjectColors.white,
  },
  ModalButtonTextStyle: {
    color: ProjectColors.headerColor,
    fontSize: 30,
    fontWeight: '600',
  },
});
