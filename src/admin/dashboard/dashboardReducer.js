const INITIAL_STATE = {
	sumary: {
		sales: '',
		users: '',
		leads: ''
	}
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
	case 'SUMARY_FETCHED':			
		return { ...state, sumary: action.payload.data };
	default:
		return state;
	}
}
