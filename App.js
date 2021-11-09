import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MyApp from './MyApp';

const initialState = {
  catList: [
  ]
}

let id = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CAT':
      console.log(action.payload)
      return { catList: [...state.catList, { ...action.payload, id: id++ }] };
    case 'REMOVE_CAT':
      return { catList: [...state.catList.filter(item => action.payload !== item.id)] };
    case 'EDIT_CAT':
      return { catList: [...state.catList.filter(item => action.payload.id !== item.id), action.payload] };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default function App() {

  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}


