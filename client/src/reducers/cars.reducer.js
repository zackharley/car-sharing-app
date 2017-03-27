import { UPDATE_CARS } from '../actions';

const initialState = {
	cars: []
};

export default function cars(state = initialState, action) {
	
	switch(action.type) {
		case UPDATE_CARS:
			return Object.assign({}, state, {
				cars: actions.cars
			});
		default:
			return state;
	}

}