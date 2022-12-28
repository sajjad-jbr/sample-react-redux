import {devToolsEnhancer} from 'redux-devtools-extension'
import {createStore} from "redux";
import bug from './bug'

export default function () {
    return createStore(
        bug,
        devToolsEnhancer({trace: true}));
};
