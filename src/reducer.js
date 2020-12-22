var initialState = {
   currentUser : undefined
};
// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      let _state = {state};
      _state.currentUser = action.data.currentUser ? action.data.currentUser : undefined;
      return _state;
    default:
      return state
  }
}