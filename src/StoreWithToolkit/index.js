import {configureStore} from '@reduxjs/toolkit'

import reducer from './bug'
import projectReducer  from './project'

export default function () {
    return configureStore({
        // reducer,
        reducer:projectReducer
    })
}
