import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const CardForm = ({ title, onSubmit, initialPersonData }) => {
  const [person, setPerson] = useState(initialPersonData);

  const setPersonData = (value, field) => {
    if(field === 'color') {
      return setPerson({...person, [field]: value.toLowerCase()})
    }

    return setPerson({...person, [field]: value});
  };

  return (
    <View style={styles.cardCreateWrapperStyle}>
      <Text style={styles.inputLabelStyle}>First name</Text>
      <TextInput
        placeholder="First name"
        style={styles.textInputStyle}
        onChangeText={(value) => setPersonData(value, 'firstName')}
        value={person.firstName}
        />
      <Text style={styles.inputLabelStyle}>Last name</Text>
      <TextInput
        placeholder="Last name"
        style={styles.textInputStyle}
        onChangeText={(value) => setPersonData(value, 'lastName')}
        value={person.lastName}
        />
      <Text style={styles.inputLabelStyle}>Age</Text>
      <TextInput
        placeholder="Age"
        style={styles.textInputStyle}
        onChangeText={(value) => setPersonData(value, 'age')}
        value={person.age}
        />
      <Text style={styles.inputLabelStyle}>Prefered color</Text>
      <TextInput
        placeholder="Color"
        style={styles.textInputStyle}
        onChangeText={(value) => setPersonData(value, 'color')}
        value={person.color}
      />
      <Button 
        title={title}
        onPress={() => onSubmit(person)}
      />
    </View>
  )
};

CardForm.defaultProps = {
  initialPersonData: {}
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomColor: 'black',
    borderWidth: 1,
    padding: 5,
    fontSize: 18,
    marginBottom: 20
  },
  inputLabelStyle: {
    fontSize: 20,
    marginBottom: 6
  },
  cardCreateWrapperStyle: {
    margin: 10
  }
});

export default CardForm;