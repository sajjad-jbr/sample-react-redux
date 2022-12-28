import * as actionTypes from "./actionTypes";

export function addBugAction(description) {
    return {
        type: actionTypes.addBug,
        payload: {
            description: description
        }
    }
}

export const removeBugAction = (bug) => ({
    type: actionTypes.removeBug,
    payload: bug
})

export const resolveBugAction = (bug) => ({
    type: actionTypes.resolveBug,
    payload: bug
})
