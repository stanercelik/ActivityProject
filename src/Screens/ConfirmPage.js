import React from 'react';
import {
  SafeAreaView,
  Switch,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default ConfirmPage = ({navigation}) => {
  return (
    <View style={{height: '50%', backgroundColor: '#FF0'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainPage');
        }}>
        <Text>CONFIRM PAGE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
