const INITIAL_STATE = {
	list: [],
	listZones: []
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'LIST_ZONE_FETCHED':
			return { ...state, list: action.payload.data };
		case 'LIST_ZONE_BY_COUNTRY_ID_FETCHED':
			return { ...state, listZones: action.payload.data };
	default:
		return state;
	}
}