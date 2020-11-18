import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import CardsScreen from './src/screens/CardsScreen';
import CardDetailScreen from './src/screens/CardDetailScreen';
import CardCreateScreen from './src/screens/CardCreateScreen';
import CardEditScreen from './src/screens/CardEditScreen';
import { Provider } from './src/context/CardsContext';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Cards: CardsScreen,
    CardCreate: CardCreateScreen,
    CardDetail: CardDetailScreen,
    CardEdit: CardEditScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Cards App"
    }
  }
);

const App = createAppContainer(navigator);
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
};
