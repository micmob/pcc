import { combineReducers } from 'redux';
import councillorsReducer from './councillorsReducer';
import councilsReducer from './councilsReducer';
import affairsReducer from './affairsReducer';

const reducers = combineReducers({
    councillors: councillorsReducer,
    councils: councilsReducer,
    affairs: affairsReducer,
});

export default reducers;
