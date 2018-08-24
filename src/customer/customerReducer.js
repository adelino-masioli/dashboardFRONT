const INITIAL_STATE = {
	list: [],
	listFilter: [],
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'LIST_CUSTOMER_FETCHED':
		return { ...state,
			list: action.payload.data
		}
	default:
		return state;
	}
}