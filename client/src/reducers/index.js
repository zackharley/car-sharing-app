import { combineReducers } from 'redux';
import carsReducer from './cars.reducer';

const reducers = combineReducers({
	cars: carsReducer
});

export default reducers;