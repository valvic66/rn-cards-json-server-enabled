// export const initialState = [
//   {id: '1000', firstName: 'Valentin', lastName: 'Micu', age: '20', color: 'green'},
//   {id: '1001', firstName: 'Victoria', lastName: 'Micu', age: '18', color: 'pink'},
//   {id: '1002', firstName: 'Andu', lastName: 'Micu', age: '10', color: 'blue'},
//   {id: '1003', firstName: 'Luca', lastName: 'Micu', age: '14', color: 'yellow'}
// ];
  
export const reducer = (state, action) => {
  switch(action.type) {
    case 'add_person':
      return [...state, {id: String(state.length + 1), ...action.payload}];
    case 'delete_person':
      const { deletePersonId } = action.payload;
      
      return state.filter(person => person.id != deletePersonId);
    case 'sort_by_name_asc':
      const sortedPersonsByNameAsc = state.sort((a, b) => a.firstName.localeCompare(b.firstName));
      
      return [...sortedPersonsByNameAsc];
    case 'sort_by_name_dsc':
      const sortedPersonsByNameDsc = state.sort((a, b) => b.firstName.localeCompare(a.firstName));
        
      return [...sortedPersonsByNameDsc];
    case 'edit_person':
      const { personId } = action.payload;

      return state.map(person => {
        if(person.id === personId) {
          return {id: personId, ...action.payload};
        } else {
          return person;
        }
      });
    case 'get_cards':
      return action.payload;
    default:
      return state;
  }
};