import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './Screens/MainPage';
import {Provider} from 'react-redux';
import reduxStore from './Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ProjectColors from './Constants/ProjectColors';
//import BackgroundGeolocation from 'react-native-background-geolocation';

const NavStack = createNativeStackNavigator();

function App() {
  const {store, persistor} = reduxStore();

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
