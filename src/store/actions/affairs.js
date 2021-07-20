import { ActionTypes } from './action-types';

export const fetchAffairs = pageNumber => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_AFFAIRS,
        });

        try {
            // ***** fetching data from each page *****
            const response = await fetch(
                `https://guarded-beyond-25903.herokuapp.com/http://ws-old.parlament.ch/affairs?format=json&lang=en&pageNumber=${pageNumber}`
            );

            if (response.status === 200) {
                const json = await response.json();
                dispatch({
                    type: ActionTypes.FETCH_AFFAIRS_COMPLETE,
                    payload: json,
                });
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_AFFAIRS_ERROR,
                payload: err.message,
            });
        }
    };
};
