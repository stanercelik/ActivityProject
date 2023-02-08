import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
import ProjectColors from '../Constants/ProjectColors';
import RoundedButton from '../Components/RoundedButtonComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SetTimer, SetActivity} from '../Redux/action';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '../Components/BottomSheet';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

export default MainPage = () => {
  const {timer, activity} = useSelector(state => state.activityReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetActivity('No Activity'));
    const interval = setInterval(() => {
      StopWatchF(newDate);
    }, 1000);
    setIntervalId(interval);
  }, []);

  const IconButtonList = [
    {iconName: 'road', text: 'Driving'},
    {iconName: 'traffic-light', text: 'Traffic'},
    {iconName: 'gas-pump', text: 'Tanking'},
    {iconName: 'coffee', text: 'Rest'},
    {iconName: 'ellipsis-h', text: 'Other'},
  ];

  const noActivity = {
    iconName: 'exclamation-triangle',
    text: 'No Activity',
  };

  const [newDate, setDate] = useState(Date.now());
  const [indx, setindx] = useState(0);
  const [tmpindx, settmpindx] = useState(0);
  const [timeText, setTimeText] = useState('');
  const [item, setItem] = useState();
  const [intervalId, setIntervalId] = useState(0);

  const {height} = useWindowDimensions();

  const bottomSheetRef = useRef();

  const pressHandler = useCallback(() => {
    bottomSheetRef.current.expand();
  }, []);

  const StopWatchF = newD => {
    let currDate = Date.now();

    var diff = (currDate - newD) / 1000;
    diff = Math.abs(Math.floor(diff));

    var days = Math.floor(diff / (24 * 60 * 60));
    var leftSec = diff - days * 24 * 60 * 60;

    var hrs = Math.floor(leftSec / (60 * 60));
    var leftSec = leftSec - hrs * 60 * 60;

    var min = Math.floor(leftSec / 60);
    var leftSec = leftSec - min * 60;

    return setTimeText(
      ('00' + hrs).slice(-2) +
        ':' +
        ('00' + min).slice(-2) +
        ':' +
        ('00' + leftSec).slice(-2),
    );
  };

  const modalButtonOnPress = () => {
    dispatch(SetActivity(item.text));
    dispatch(SetTimer(timeText));
    setindx(tmpindx);
    pressHandler();

    clearInterval(intervalId);
    setIntervalId(0);

    newD = Date.now();
    //setDate(newD);
    const newInterval = setInterval(() => {
      StopWatchF(newD);
    }, 1000);
    setIntervalId(newInterval);

    bottomSheetRef.current.close();
  };

  const SelectIcon = props => {
    return (
      <Icon
        style={{flex: 1}}
        name={props.icName}
        color={ProjectColors.white}
        size={24}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.background}>
        <View style={styles.activityContainerStyle}>
          <View style={styles.ActivityLeftSideStyle}>
            <View style={{marginRight: 8}}>
              {activity == 'No Activity' ? (
                <SelectIcon icName={noActivity.iconName} />
              ) : (
                <SelectIcon icName={IconButtonList[indx].iconName} />
              )}
            </View>

            {activity == 'No Activity' ? (
              <Text style={styles.activityTextStyle}>{noActivity.text}</Text>
            ) : (
              <Text style={styles.activityTextStyle}>
                {IconButtonList[indx].text}
              </Text>
            )}
          </View>

          <Text style={styles.timeFont}>{timeText}</Text>
        </View>

        <View
          style={{alignItems: 'center', width: '100%', alignSelf: 'center'}}>
          <FlatList
            keyExtractor={(item, index) => item.toString()}
            style={{
              margin: 15,
              width: '100%',
              alignContent: 'space-between',
            }}
            data={IconButtonList}
            numColumns={3}
            renderItem={({item, index}) => (
              <RoundedButton
                iconName={item.iconName}
                text={item.text}
                onPressHandler={() => {
                  setItem(item);
                  settmpindx(index);
                  pressHandler();
                }}
              />
            )}
          />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          activeHeight={height * 0.85}
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
            <Text style={styles.bottomSheetActivityStyle}>{activity}</Text>
            <Text style={styles.bottomSheetActivityStyle}>{timeText}</Text>
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
                name={IconButtonList[tmpindx].iconName}
                color={ProjectColors.white}
                size={50}
              />
              <Text style={styles.iconTextStyle}>
                {IconButtonList[tmpindx].text}
              </Text>
            </View>
            <Text style={styles.bottomsheetTextStyle}>
              Do you want to change your activity?
            </Text>
            <TouchableOpacity
              style={styles.ModalButtonStyle}
              onPress={() => {
                modalButtonOnPress();
              }}>
              <Text style={styles.ModalButtonTextStyle}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: ProjectColors.backgroundColor,
    flex: 1,
    paddingVertical: 12,
  },
  activityContainerStyle: {
    flexDirection: 'row',
    backgroundColor: ProjectColors.activityColor,
    padding: 14,
    marginHorizontal: 12,
    height: '10%',
    borderRadius: 6,
  },
  activityTextStyle: {
    color: ProjectColors.white,
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  ActivityLeftSideStyle: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
  },
  timeFont: {
    color: ProjectColors.white,
    fontWeight: '700',
    fontSize: 17,
    alignSelf: 'center',
  },
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
