import { createStore } from 'redux';

import reducer from './reducers/mobileReducer';

const store = createStore(reducer);

export default store;
