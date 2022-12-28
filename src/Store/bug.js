// ducks pattern
// action types
const addBug = "ADD_BUG"
const removeBug = "REMOVE_BUG"
const resolveBug = "RESOLVE_BUG"

// action creator
export function addBugAction(description) {
    return {
        type: addBug,
        payload: {
            description: description
        }
    }
}

export const removeBugAction = (bug) => ({
    type: removeBug,
    payload: bug
})

export const resolveBugAction = (bug) => ({
    type: resolveBug,
    payload: bug
})


// reducer
let lastId = 0;

export default function reducer(store = [], action) {
    if (action.type === addBug) {
        return [
            ...store,
            {
                id: ++lastId,
                description: action.payload.description,
                resolve: false
            }
        ]
    } else if (action.type === removeBug) {
        return store.filter(item => item.id !== action.payload.id)
    } else if (action.type === resolveBug) {
        return store.map(bug => bug.id === action.payload.id ? {...bug, resolve: true} : bug)
        /*        let temp = Object.assign([], store)
                // let temp = [...store]
                let findIndex = temp.findIndex(item => item.id === action.payload.id)
                if (findIndex >= 0)
                    temp[findIndex].resolve = true
                return temp*/
    } else {
        return store
    }

    /*    switch (action.type) {
            case actionTypes.addBug:
                return [
                    ...store,
                    {
                        id: ++lastId,
                        description: action.payload.description,
                        resolve: false
                    }
                ]
            case actionTypes.removeBug:
                return store.filter(item => item.id !== action.payload)
            default:
                return store;
        }*/
}
