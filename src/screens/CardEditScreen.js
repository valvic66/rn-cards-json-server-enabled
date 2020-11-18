import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/CardsContext';
import CardForm from '../components/CardForm';

const CardEditScreen = ({ navigation }) => {
  const personId = navigation.getParam('personId');
  const { state, dispatch } = useContext(Context);
  const currentPerson = state.find(person => person.id === personId);
  
  const editPerson = (person, navigateCallback) => {
    dispatch({type: 'edit_person', payload: {
      personId: currentPerson.id.toString(), 
      firstName: person.firstName, 
      lastName: person.lastName, 
      age: person.age,
      color: person.color
    }});
    navigateCallback();
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