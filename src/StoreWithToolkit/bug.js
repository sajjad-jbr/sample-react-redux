// ducks pattern
// action creator
import {createAction, createReducer, createSlice} from '@reduxjs/toolkit'

export const addBug = createAction("ADD_BUG")
export const removeBug = createAction("REMOVE_BUG")
export const resolveBug = createAction("RESOLVE_BUG")
export const updateBug = createAction("UPDATE_BUG")

// reducer
let lastId = 0;

const addBugHandler = (state, action) => {
    state.push({
        id: ++lastId,
        description: action.payload.description,
        resolve: false
    })
}
const removeBugHandler = (state, action) => {
    let findIndex = state.findIndex(item => item.id === action.payload.id)
    if (findIndex >= 0)
        state.splice(findIndex, 1)
}
const resolveBugHandler = (state, action) => {
    let findIndex = state.findIndex(item => item.id === action.payload.id)
    if (findIndex >= 0)
        state[findIndex].resolve = true
}
const updateBugHandler = (state, action) => {
    let findIndex = state.findIndex(item => item.id === action.payload.id)
    if (findIndex >= 0)
        state[findIndex] = action.payload
}

const slice = createSlice({
    name: "bug",
    initialState: [],
    reducers: {
        ADD_BUG: addBugHandler,
        REMOVE_BUG: removeBugHandler,
        RESOLVE_BUG: resolveBugHandler,
        UPDATE_BUG: updateBugHandler,
    }
})

console.log("sajjad: ", slice)

const reducer = createReducer([], {
    [addBug.type]: addBugHandler,
    [removeBug.type]: removeBugHandler,
    [resolveBug.type]: resolveBugHandler,
    [updateBug.type]: updateBugHandler,
})
export default reducer
