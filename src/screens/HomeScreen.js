import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';


const HomeScreen = (props) => {
  return (
    <View style={styles.homeScreenWrapperStyle}>
      <View style={styles.cardsScreenButtonStyle}>
        <Button title='CARDS SCREEN' onPress={() => props.navigation.navigate('Cards')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenWrapperStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },
  cardsScreenButtonStyle: {
    paddingVertical: 10
  },
  jsonApiSCreenStyle: {
    paddingVertical: 10
  }
});

export default HomeScreen;
