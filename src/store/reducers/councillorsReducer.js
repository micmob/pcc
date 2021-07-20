import produce, { current } from 'immer';
import { ActionTypes } from '../actions/action-types';

const initialState = {
    loading: true,
    error: null,
    data: [],
};

const reducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_COUNCILLORS:
            state.loading = true;
            state.error = null;
            state.data = [];

            return state;
        case ActionTypes.FETCH_COUNCILLORS_ERROR:
            state.loading = false;
            state.error = action.payload;
            state.data = [];

            return state;
        case ActionTypes.FETCH_COUNCILLORS_COMPLETE:
            state.loading = false;
            state.data.push(...action.payload);

            return state;
        default:
            return state;
    }
});

export default reducer;
