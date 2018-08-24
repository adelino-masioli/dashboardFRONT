const INITIAL_STATE = {
	list: [],
	listCities: []
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'LIST_CITY_FETCHED':
			return { ...state, list: action.payload.data };
		case 'LIST_CITY_BY_ZONE_ID_FETCHED':
			return { ...state, listCities: action.payload.data };
	default:
		return state;
	}
}