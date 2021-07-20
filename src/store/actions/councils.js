import { ActionTypes } from './action-types';

export const fetchCouncils = pageNumber => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_COUNCILS,
        });

        try {
            // ***** fetching data from each page *****
            const response = await fetch(
                `https://guarded-beyond-25903.herokuapp.com/http://ws-old.parlament.ch/councils?format=json&lang=en&pageNumber=${pageNumber}`
            );

            if (response.status === 200) {
                const json = await response.json();
                dispatch({
                    type: ActionTypes.FETCH_COUNCILS_COMPLETE,
                    payload: json,
                });
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_COUNCILS_ERROR,
                payload: err.message,
            });
        }
    };
};
