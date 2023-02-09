import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './Screens/MainPage';
import {Provider} from 'react-redux';
import reduxStore from './Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ProjectColors from './Constants/ProjectColors';
import BackgroundGeolocation from 'react-native-background-geolocation';

const NavStack = createNativeStackNavigator();

function App() {
  const {store, persistor} = reduxStore();

  useEffect(() => {
    componentWillMount = () => {
      ////
      // 1.  Wire up event-listeners
      //

      // This handler fires whenever bgGeo receives a location update.
      BackgroundGeolocation.onLocation(this.onLocation, this.onError);

      // This handler fires when movement states changes (stationary->moving; moving->stationary)
      BackgroundGeolocation.onMotionChange(this.onMotionChange);

      // This event fires when a change in motion activity is detected
      BackgroundGeolocation.onActivityChange(this.onActivityChange);

      // This event fires when the user toggles location-services authorization
      BackgroundGeolocation.onProviderChange(this.onProviderChange);

      ////
      // 2.  Execute #ready method (required)
      //
      BackgroundGeolocation.ready(
        {
          // Geolocation Config
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          distanceFilter: 10,
          // Activity Recognition
          stopTimeout: 1,
          // Application config
          debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
          logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
          stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
          startOnBoot: true, // <-- Auto start tracking when device is powered-up.
          // HTTP / SQLite config
          url: 'http://yourserver.com/locations',
          batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
          autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
          headers: {
            // <-- Optional HTTP headers
            'X-FOO': 'bar',
          },
          params: {
            // <-- Optional HTTP params
            auth_token: 'maybe_your_server_authenticates_via_token_YES?',
          },
        },
        state => {
          console.log(
            '- BackgroundGeolocation is configured and ready: ',
            state.enabled,
          );

          if (!state.enabled) {
            ////
            // 3. Start tracking!
            //
            BackgroundGeolocation.start(function () {
              console.log('- Start success');
            });
          }
        },
      );
    };

    // You must remove listeners when your component unmounts
    componentWillUnmount = () => {
      BackgroundGeolocation.removeListeners();
    };
    onLocation = location => {
      console.log('[location] -', location);
    };
    onError = error => {
      console.warn('[location] ERROR -', error);
    };
    onActivityChange = event => {
      console.log('[activitychange] -', event); // eg: 'on_foot', 'still', 'in_vehicle'
    };
    onProviderChange = provider => {
      console.log('[providerchange] -', provider.enabled, provider.status);
    };
    onMotionChange = event => {
      console.log('[motionchange] -', event.isMoving, event.location);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <NavStack.Navigator>
              <NavStack.Screen
                name="MainPage"
                component={MainPage}
                options={options}
              />
            </NavStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerFontStyle: {
    fontWeight: '600',
    fontSize: 28,
    color: ProjectColors.white,
  },
  headerStyle: {
    headerLayoutPreset: 'center',
    backgroundColor: ProjectColors.headerColor,
  },
});

const options = {
  headerTitleAlign: 'center',
  title: 'Activities',
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerFontStyle,
};

export default App;
