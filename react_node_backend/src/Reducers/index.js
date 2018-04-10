import {combineReducers} from 'redux';
import CurrentProject from './current-project';


const allReducers = combineReducers({
    currentProject : CurrentProject
});

export default allReducers;