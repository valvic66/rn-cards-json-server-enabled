import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/CardsContext';
import CardForm from '../components/CardForm';
import cardsApi from '../api/cardsApi';

const CardEditScreen = ({ navigation }) => {
  const personId = navigation.getParam('personId');
  const { state, dispatch } = useContext(Context);
  const currentPerson = state.find(person => person.id === personId);
  
  const editPerson = async (person, navigateCallback) => {
    try {
      await cardsApi.put(`/cards/${currentPerson.id}`, {
        firstName: person.firstName, 
        lastName: person.lastName, 
        age: person.age,
        color: person.color
      });

      dispatch({type: 'edit_person', payload: {
        personId: currentPerson.id.toString(), 
        firstName: person.firstName, 
        lastName: person.lastName, 
        age: person.age,
        color: person.color
      }});
      
      if(navigateCallback) {
        navigateCallback();
      };
    } catch(error) {
      console.error(error);
    };
  };

  return (
    <View style={styles.cardEditWrapperStyle}>
      <CardForm 
        title='EDIT PERSON'
        initialPersonData={currentPerson}
        onSubmit={(person) => editPerson(person, () => navigation.navigate('Cards'))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardEditWrapperStyle: {}
});

export default CardEditScreen;