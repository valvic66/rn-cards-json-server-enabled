import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import CardDetail from "../components/CardDetail";
import { Context } from '../context/CardsContext';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import cardsApi from '../api/cardsApi';

const CardsScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(Context);
  const [loading, setLoadingState] = useState(true);

  const deletePerson = async id => {
    try {
      await cardsApi.delete(`/cards/${id}`);

      dispatch({
        type: 'delete_person',
        payload: id
      });
    } catch(err) {
      console.error(error);
    }
  };

  const getCards = async () => {
    try {
      const response = await cardsApi.get('/cards');
      setLoadingState(false);
      
      dispatch({type: 'get_cards', payload: response.data});
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCards();
    const listener = navigation.addListener('didFocus', () => {
      getCards();
    });

    return () => {
      listener.remove();
    };
  }, []);

  if(loading) {
    return <ActivityIndicator size='large' animating={true} style={styles.activityIndicatorStyle} />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.sortByButtonGroupStyle}>
        {state.length > 0 && (
          <Text style={styles.cardsNumberStyle}>Cards found: {state.length}</Text>
        )}
        <View style={styles.buttonGroupStyle}>
          <TouchableOpacity onPress={() => dispatch({type: 'sort_by_name_asc'})}>
            <FontAwesome name='sort-amount-asc' style={styles.buttonStyle} color='grey' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch({type: 'sort_by_name_dsc'})}>
            <FontAwesome name='sort-amount-desc' style={styles.buttonStyle} color='grey' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsStyle}>
        <FlatList 
          data={state}
          renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('CardDetail', { personId: item.id })}>
                  <CardDetail
                    id={item.id}  
                    firstName={item.firstName}
                    lastName={item.lastName}
                    age={item.age}
                    color={item.color}
                    onChangeData={(id, newPerson) => {
                      dispatch({type: 'edit_person', payload: {
                        personId: id.toString(), 
                        firstName: newPerson.firstName, 
                        lastName: newPerson.lastName, 
                        age: newPerson.age, 
                        color: newPerson.color
                      }})
                    }}
                    onDeleteData={deletePerson}
                  />
                </TouchableOpacity>    
              )
            }
          }
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

CardsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('CardCreate')}>
        <AntDesign style={styles.headerRightIconStyle} name="plus" size={26} color="black" />
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  sortByButtonGroupStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center'
  },
  buttonGroupStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonStyle: {
    padding: 8,
    marginHorizontal: 2,
    fontSize: 24,
    textAlign: 'center',
    borderRadius: 22
  },
  cardsStyle: {
    flex: 1
  },
  closeIconStyle: {
    fontSize: 20,
    padding: 5,
    alignSelf: 'flex-end'
  },
  closeIconTextInputStyle: {
    position: 'absolute',
    fontSize: 16,
    padding: 5,
    top: 7,
    right: 5
  },
  overlaySaveButtonStyle: {
    marginTop: 10
  },
  addButtonStyle: {
    padding: 5,
    marginTop: 5
  },
  cardsNumberStyle: {
    fontSize: 20
  },
  headerRightIconStyle: {
    marginRight: 10,
    padding: 5
  },
  activityIndicatorStyle: {
    flex: 1
  }
});

export default CardsScreen;
