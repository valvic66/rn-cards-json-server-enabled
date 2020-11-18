import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Context } from '../context/CardsContext';
import { AntDesign } from '@expo/vector-icons';
import { Card } from 'react-native-elements';

const CardDetailScreen = ({ navigation }) => {
  const personId = navigation.getParam('personId');
  const { state } = useContext(Context);
  const { firstName, lastName, age, color } = state.find(person => person.id === personId);

  const getColor = () => {
    return {
      color
    }
  };

  return (
    <Card>
      <Card.Title >Report</Card.Title>
      <Card.Divider />
      <Text>Full name: {firstName} {lastName}</Text>
      <Text>Age: {age}</Text>
      <Text style={getColor()}>Favorite color: {color}</Text>
    </Card>
  );
}

CardDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('CardEdit', {personId: navigation.getParam('personId')})}>
        <AntDesign style={styles.headerRightIconStyle} name="edit" size={26} color="black" />
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  headerRightIconStyle: {
    marginRight: 10,
    padding: 5
  }
});

export default CardDetailScreen;