import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/CardsContext';
import CardForm from '../components/CardForm';
import cardsApi from '../api/cardsApi';

const CardCreateScreen = ({ navigation }) => {
  const { dispatch } = useContext(Context);

  const addPerson = async (person, navigateCallback) => {
    try {
      await cardsApi.post('/cards', { ...person });
    } catch(err) {
      console.error(error);
    }

    if(navigateCallback) {
      navigateCallback();
    }
  };

  return (
    <View style={styles.cardCreateWrapperStyle}>
      <CardForm
        title='ADD PERSON'
        onSubmit={(person) => addPerson(person, () => navigation.navigate('Cards'))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardCreateWrapperStyle: {}
});

export default CardCreateScreen;