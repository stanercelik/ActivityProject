import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ProjectColors from '../Constants/ProjectColors';
import RoundedButton from '../Components/RoundedButtonComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SetTimer, SetActivity} from '../Redux/action';
//import BackgroundGeolocation from "react-native-background-geolocation";
const useTracking = (isActive: boolean) => {

    const defaultLocation = {
        latitude: 0,
        longitude: 0,
    }
    const [location, setLocation] = useState(defaultLocation);
    const [history, setHistory] = useState<any>([]);
    const [distance, setDistance] = useState<number>(0);
  
    useEffect(() => {
      if (!isActive) {
        return;
      }
      BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        stationaryRadius: 50,
        distanceFilter: 10,
        stopTimeout: 5,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        debug: true,
        startOnBoot: true,
        stopOnTerminate: true,
        //locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER, // DISTANCE_FILTER_PROVIDER for
        //interval: 10000,
        //fastestInterval: 5000,
        //activitiesInterval: 10000,
        //stopOnStillActivity: false,
        url: 'http://192.168.81.15:3000/location',
        headers: {
          'X-FOO': 'bar',
        },
        // customize post properties
      });
  
      BackgroundGeolocation.on('location', (location) => {
        console.log('loc', location);
        setLocation((prev) => ({
          ...prev,
          latitude: location.latitude,
          longitude: location.longitude,
        }));

        
        // handle your locations here
        // to perform long running operation on iOS
        // you need to create background task
        BackgroundGeolocation.startTask((taskKey) => {
          // execute long running task
          // eg. ajax post location
          // IMPORTANT: task has to be ended by endTask
          BackgroundGeolocation.endTask(taskKey);
        });
      });
  
      BackgroundGeolocation.on('stationary', (stationaryLocation) => {
        // handle stationary locations here
      });
  
      BackgroundGeolocation.on('error', (error) => {
        //console.log('[ERROR] BackgroundGeolocation error:', error);
      });
  
      BackgroundGeolocation.on('start', () => {
        //console.log('[INFO] BackgroundGeolocation service has been started');
      });
  
      BackgroundGeolocation.on('stop', () => {
        //console.log('[INFO] BackgroundGeolocation service has been stopped');
      });
  
      BackgroundGeolocation.on('authorization', (status) => {
        console.log(
          '[INFO] BackgroundGeolocation authorization status: ' + status,
        );
        if (status !== BackgroundGeolocation.AUTHORIZED) {
          // we need to set delay or otherwise alert may not be shown
          setTimeout(
            () =>
              Alert.alert(
                'App requires location tracking permission',
                'Would you like to open app settings?',
                [
                  {
                    text: 'Yes',
                    onPress: () => BackgroundGeolocation.showAppSettings(),
                  },
                  {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                  },
                ],
              ),
            1000,
          );
        }
      });
  
      BackgroundGeolocation.on('background', () => {
        console.log('[INFO] App is in background');
      });
  
      BackgroundGeolocation.on('foreground', () => {
        console.log('[INFO] App is in foreground');
      });
  
      BackgroundGeolocation.checkStatus((status) => {
        console.log(
          '[INFO] BackgroundGeolocation service is running',
          status.isRunning,
        );
        console.log(
          '[INFO] BackgroundGeolocation services enabled',
          status.locationServicesEnabled,
        );
        console.log(
          '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
        );
  
        // you don't need to check status before start (this is just the example)
        if (!status.isRunning) {
          BackgroundGeolocation.start(); //triggers start on start event
        }
      });
  
      return () => {
        console.log('Removing all listeners');
        BackgroundGeolocation.removeAllListeners();
      };
    }, [location, isActive]);
  
    return {location, history, distance};
  };
  
  export default useTracking;