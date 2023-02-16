import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Switch,
} from 'react-native';
import ProjectColors from '../Constants/ProjectColors';
import RoundedButton from '../Components/RoundedButtonComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SetTimer, SetActivity, SetActivityDate} from '../Redux/action';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BackgroundGeolocation from 'react-native-background-geolocation';
import BottomSheetComp from '../Components/BottomSheetComp';

let isMove = true;
let controlInterval = 0;
var activityList = [];

export default MainPage = () => {
  const {activityDate, activity} = useSelector(state => state.activityReducer);
  const dispatch = useDispatch();

  const [enabled, setEnabled] = useState(false);
  const [isMoving, setIsMoving] = useState(true);
  const [newDate, setDate] = useState(Date.now());
  const [indx, setindx] = useState(0);
  const [tmpindx, settmpindx] = useState(0);
  const [timeText, setTimeText] = useState('');
  const [item, setItem] = useState();
  const [intervalId, setIntervalId] = useState(0);

  const [intervalID, setIntervalID] = useState(0);

  const {height} = useWindowDimensions();

  const bottomSheetRef = useRef();

  useEffect(() => {
    isMove = isMoving;
    controlInterval = intervalID;

    return () => {
      isMove = null;
      controlInterval = null;
    };
  }, [isMoving, intervalID]);

  useEffect(() => {
    dispatch(SetActivity('No Activity'));

    // activityList.push({
    //   ActivityName: 'No Activity',
    //   ActivityDate: Date(),
    // });

    // activityList.push({
    //   ActivityName: 'No Activity',
    //   ActivityDate: Date(),
    // });

    const interval = setInterval(() => {
      StopWatchF(newDate, 0);
    }, 1000);
    setIntervalId(interval);
  }, []);

  useEffect(() => {
    const onLocation = BackgroundGeolocation.onLocation(location => {
      console.log('------------------------------------------');
      console.log('[LOCATION SPEED]: ', location.coords.speed);
      //console.log(location.is_moving);
      if (location.coords.speed > 10) {
        setIsMoving(true);
      } else {
        setIsMoving(false);
        //setFlag(!gloabalFlag);
      }
      console.log('IS MOVING: ', isMove);
    });

    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: false, // <-- [Default: true] Set true to sync each location to server as it arrives.
    }).then(state => {
      setEnabled(state.enabled);
      console.log(
        '- BackgroundGeolocation is configured and ready: ',
        state.enabled,
      );
    });
  }, []);

  useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();

      console.log('bggl started!');
    } else {
      BackgroundGeolocation.stop();
      console.log('bggl stopped!');
    }
  }, [enabled]);

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

  const intervalManager = () => {
    let timeoutId = 0;
    let controlInterval = 0;
    let count = 0;
    //let dateTime = Date.now();
    //setIsMoving(true);
    if (item.text == 'Driving') {
      console.log('ifDriving');

      //clearInterval(controlInterval);

      controlInterval = setInterval(async () => {
        console.log('interval isMove:', isMove);
        // let location = await BackgroundGeolocation.getCurrentPosition({
        //   timeout: 30, // 30 second timeout to fetch location
        //   maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
        //   desiredAccuracy: 10, // Try to fetch a location with an accuracy of `10` meters.
        //   samples: 2, // How many location samples to attempt.
        //   extras: {
        //     // Custom meta-data.
        //     route_id: 123,
        //   },
        // });

        if (!isMove) {
          console.log('timeouta giriyor');
          count++;
          console.log('count: ', count);
          if (count == 10) {
            dispatch(SetActivity(noActivity.text));
            clearInterval(controlInterval);
            count = 0;
          } else if (count == 5) {
            setIsMoving(true);
          }
          //timeoutId = setTimeout(() => {}, 5000);
        }

        if (isMove) {
          count = 0;
        }
      }, 1000);
      //setIntervalID(intId);
    } else {
      console.log('if !Driving');
      clearInterval(controlInterval);
    }
  };

  const modalButtonOnPress = () => {
    newD = Date.now();

    // Driving diyince bi şey yapma drivingte durduğunda 10 sn başlat
    // o sürede hareket etmezse no activity

    let controlInterval = null;
    let count = 0;
    //let dateTime = Date.now();
    //setIsMoving(false);
    if (item.text == 'Driving') {
      console.log('ifDriving');
      setIsMoving(true);

      if (controlInterval) {
        clearInterval(controlInterval);
      }

      controlInterval = setInterval(async () => {
        console.log('interval isMove:', isMove);
        // let location = await BackgroundGeolocation.getCurrentPosition({
        //   timeout: 30, // 30 second timeout to fetch location
        //   maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
        //   desiredAccuracy: 10, // Try to fetch a location with an accuracy of `10` meters.
        //   samples: 2, // How many location samples to attempt.
        //   extras: {
        //     // Custom meta-data.
        //     route_id: 123,
        //   },
        // });

        if (!isMove) {
          console.log('timeouta giriyor');
          count++;
          console.log('count: ', count);
          if (count == 10) {
            dispatch(SetActivity(noActivity.text));

            clearInterval(controlInterval);
            controlInterval = null;
            count = 0;
          }
          //timeoutId = setTimeout(() => {}, 5000);
        }

        if (isMove) {
          count = 0;
        }
      }, 1000);
      //setIntervalID(intId);
    } else {
      console.log('if !Driving');

      clearInterval(controlInterval);
      controlInterval = null;
    }

    dispatch(SetActivity(item.text));
    dispatch(SetActivityDate(Date()));

    var obj = {
      ActivityName: activity,
      ActivityDate: activityDate,
    };

    activityList.push(obj);

    activityList.forEach(element => {
      console.log(element);
    });

    //console.log(tmpindx);
    setindx(tmpindx);

    clearInterval(intervalId);
    setIntervalId(0);

    setInterval(() => {
      StopWatchF(newD);
    }, 1000);

    bottomSheetRef.current.close();
  };

  const renderItem = ({item, index}) => (
    <RoundedButton
      iconName={item.iconName}
      text={item.text}
      onPressHandler={() => {
        setItem(item);
        settmpindx(index);
        pressHandler();
      }}
    />
  );

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
            renderItem={renderItem}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Click to enable BackgroundGeolocation</Text>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>

        <BottomSheetComp
          activity={
            activity == 'No Activity'
              ? noActivity.text
              : IconButtonList[indx].text
          }
          timeText={timeText}
          bottomSheetRef={bottomSheetRef}
          height={height}
          iconName={IconButtonList[tmpindx].iconName}
          iconText={IconButtonList[tmpindx].text}
          modalOnPress={() => {
            modalButtonOnPress();
          }}
        />
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
});
