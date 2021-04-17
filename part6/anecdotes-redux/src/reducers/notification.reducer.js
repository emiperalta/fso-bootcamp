const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.text;
    case 'CLEAR_NOTIFICATION':
      return (state = '');
    default:
      return state;
  }
};

export const showNotification = (text, sec) => {
  return async dispatch => {
    dispatch({ type: 'SHOW_NOTIFICATION', text });
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), sec * 1000);
  };
};

export default reducer;
