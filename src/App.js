import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmPage from './Screens/ConfirmPage';
import MainPage from './Screens/MainPage';
import {Provider} from 'react-redux';
import reduxStore from './Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ProjectColors from './Constants/ProjectColors';

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
                options={{
                  headerTitleAlign: 'center',
                  title: 'Activities',
                  headerStyle: {
                    headerLayoutPreset: 'center',
                    backgroundColor: ProjectColors.headerColor,
                  },
                  headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 28,
                    color: ProjectColors.white,
                  },
                }}
              />
              <NavStack.Screen
                name="ConfirmPage"
                component={ConfirmPage}
                options={{
                  title: 'ConfirmPage',
                  headerShown: false,
                }}
              />
            </NavStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
