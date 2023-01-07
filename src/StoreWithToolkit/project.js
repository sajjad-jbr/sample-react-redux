import {createSlice} from '@reduxjs/toolkit'

let lastIdProject = 0

const sliceProject = createSlice({
    name: 'project',
    initialState: [],
    reducers: {
        addProject: (state, action) => {
            state.push({
                id: ++lastIdProject,
                name: action.payload.name
            })
        },
        removeProject: (state, action) => {
            let findIndex = state.findIndex(item => item.id === action.payload.id)
            if (findIndex >= 0)
                state.splice(findIndex, 1)
        },
        updateProject: (state, action) => {
            let findIndex = state.findIndex(item => item.id === action.payload.id)
            if (findIndex >= 0)
                state[findIndex] = action.payload
        }
    }
});

export const projectAction = sliceProject.actions
export default sliceProject.reducer
