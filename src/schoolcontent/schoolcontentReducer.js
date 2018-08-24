const INITIAL_STATE = {
	list: [],
	listFilter: [],
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'LIST_SCHOOLCONTENT_FETCHED':
		return { ...state,
			list: action.payload.data
		};
	case 'FILTER_SCHOOLCONTENT_FETCHED':
	    return { ...state,
	    	listFilter: action.payload.data
	    };
	default:
		return state;
	}
}