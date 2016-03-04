import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const combined = combineReducers(reducers);

export default function() {
	return createStoreWithMiddleware(combined);
}
