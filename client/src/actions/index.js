export const UPDATE_CARS = 'UPDATE_CARS';

export function updateCars(cars) {
	return {
		type: UPDATE_CARS,
		cars
	}
}