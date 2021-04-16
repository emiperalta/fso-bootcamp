import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import anecdoteReducer from '../reducers/anecdote.reducer';
import notificationReducer from '../reducers/notification.reducer';
import filterReducer from '../reducers/filter.reducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
