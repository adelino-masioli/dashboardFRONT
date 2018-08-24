const INITIAL_STATE = {
	list: []
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'LIST_WEBMIDIA_TYPE_FETCHED':
		return { ...state,
			list: action.payload.data
		}
	default:
		return state;
	}
}
