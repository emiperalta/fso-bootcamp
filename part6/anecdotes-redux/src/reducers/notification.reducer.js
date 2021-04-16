const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.text;
    default:
      return state;
  }
};

export const showNotification = text => {
  return {
    type: 'SHOW_NOTIFICATION',
    text,
  };
};

export default reducer;
