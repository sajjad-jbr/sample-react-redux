import * as actionTypes from './actionTypes'

let lastId = 0;

export default function reducer(store = [], action) {
    if (action.type === actionTypes.addBug) {
        return [
            ...store,
            {
                id: ++lastId,
                description: action.payload.description,
                resolve: false
            }
        ]
    } else if (action.type === actionTypes.removeBug) {
        return store.filter(item => item.id !== action.payload.id)
    } else if (action.type === actionTypes.resolveBug) {
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
