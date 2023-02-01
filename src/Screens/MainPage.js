import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import ProjectColors from '../Constants/ProjectColors';
import RoundedButton from '../Components/RoundedButtonComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SetTimer, SetActivity} from '../Redux/action';

export default MainPage = ({navigation}) => {
  const {time, activity} = useSelector(state => state.activityReducer);
  const dispatch = useDispatch();

  const IconButtonList = [
    {iconName: 'road', text: 'Driving'},
    {iconName: 'traffic-light', text: 'Traffic'},
    {iconName: 'gas-pump', text: 'Tanking'},
    {iconName: 'coffee', text: 'Rest'},
    {iconName: 'ellipsis-h', text: 'Other'},
  ];

  return (
    <View style={styles.background}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: ProjectColors.activityColor,
          padding: 14,
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {activity == '' ? (
            <Icon
              style={{flex: 1}}
              name="exclamation-triangle"
              color={ProjectColors.white}
              size={20}
            />
          ) : (
            <Icon
              style={{flex: 1}}
              name="rest"
              color={ProjectColors.white}
              size={20}
            />
          )}
        </View>
        <View>
          <Text
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              color: ProjectColors.white,
              fontWeight: '700',
              fontSize: 17,
            }}>
            00:00:24
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center', flex: 22}}>
        <FlatList
          keyExtractor={(item, index) => item.toString()}
          style={{
            margin: 15,
            width: '100%',
          }}
          data={IconButtonList}
          numColumns={3}
          renderItem={({item, index}) => (
            <RoundedButton
              iconName={item.iconName}
              text={item.text}
              onPressHandler={() => {
                navigation.navigate('ConfirmPage');
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: ProjectColors.backgroundColor,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
